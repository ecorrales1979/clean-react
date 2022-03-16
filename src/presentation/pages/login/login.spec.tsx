import React from 'react'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { cleanup, fireEvent, render, RenderResult, waitFor } from '@testing-library/react'
import faker from '@faker-js/faker'

import { InvalidCredentialsError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'
import { ValidationSpy, AuthenticationSpy, Helper } from '@/presentation/mocks'
import { Login } from '@/presentation/pages'
import { AccountModel } from '@/domain/models'

interface SutTypes {
  sut: RenderResult
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
  setCurrentAccountMock: any
}

interface SutParams {
  validationError?: string
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  const setCurrentAccountMock = jest.fn()
  validationSpy.errorMessage = params?.validationError ?? ''
  const sut = render(
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountMock,
      getCurrentAccount: () => ({} as unknown as AccountModel)
    }}>
      <HistoryRouter history={history}>
        <Login
          validation={validationSpy}
          authentication={authenticationSpy}
        />
      </HistoryRouter>
    </ApiContext.Provider>
  )

  return {
    sut,
    validationSpy,
    authenticationSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = async (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField(sut, 'email', email)
  Helper.populateField(sut, 'password', password)
  const form = sut.getByTestId('login-form') as HTMLButtonElement
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Login page', () => {
  afterEach(cleanup)

  it('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.testChildCount(sut, 'loading-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
  })

  it('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'email', '')
    Helper.testStatusForField(sut, 'email', validationError)
  })

  it('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    Helper.populateField(sut, 'password', '')
    Helper.testStatusForField(sut, 'password', validationError)
  })

  it('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'email')
    Helper.testStatusForField(sut, 'email')
  })

  it('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'password')
    Helper.testStatusForField(sut, 'password')
  })

  it('should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    Helper.populateField(sut, 'email')
    Helper.populateField(sut, 'password')
    Helper.testButtonIsDisabled(sut, 'submit', false)
  })

  it('show spinner on submit', async () => {
    const { sut } = makeSut()
    await simulateValidSubmit(sut)
    Helper.testElementExists(sut, 'spinner')
  })

  it('should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(sut, email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })

  it('Should call authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth')
    await simulateValidSubmit(sut)
    await simulateValidSubmit(sut)
    expect(authenticationSpy.auth).toHaveBeenCalledTimes(1)
  })

  it('Should not call authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { sut, authenticationSpy } = makeSut({ validationError })
    jest.spyOn(authenticationSpy, 'auth')
    await simulateValidSubmit(sut)
    expect(authenticationSpy.auth).toHaveBeenCalledTimes(0)
  })

  it('Should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    await simulateValidSubmit(sut)
    Helper.testChildCount(sut, 'loading-wrap', 1)
    Helper.testElementText(sut, 'main-error', error.message)
  })

  it('Should call SetCurrentAccount and redirect to home page on success', async () => {
    const { sut, authenticationSpy, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit(sut)
    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
    expect(history.location.pathname).toBe('/')
  })

  it('Should present error if SetCurrentAccount fails', async () => {
    const { sut, setCurrentAccountMock } = makeSut()
    const error = new InvalidCredentialsError()
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    setCurrentAccountMock.mockImplementationOnce(() => { throw error })
    await simulateValidSubmit(sut)
    Helper.testChildCount(sut, 'loading-wrap', 1)
    Helper.testElementText(sut, 'main-error', error.message)
  })

  it('Should go to signup page', () => {
    const { sut } = makeSut()
    const signupLink = sut.getByTestId('signup-link')
    fireEvent.click(signupLink)
    expect(history.location.pathname).toBe('/signup')
    // expect(window.history.length).toBe(2)
  })
})
