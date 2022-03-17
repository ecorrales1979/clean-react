import React from 'react'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import faker from '@faker-js/faker'

import { InvalidCredentialsError } from '@/domain/errors'
import { ApiContext } from '@/presentation/contexts'
import { ValidationSpy, AuthenticationSpy, Helper } from '@/presentation/mocks'
import { Login } from '@/presentation/pages'
import { AccountModel } from '@/domain/models'

interface SutTypes {
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
  render(
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
    validationSpy,
    authenticationSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = async (email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  const form = screen.getByTestId('login-form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Login page', () => {
  it('Should start with initial state', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    expect(screen.getByTestId('loading-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
  })

  it('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('email', '')
    Helper.testStatusForField('email', validationError)
  })

  it('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('password', '')
    Helper.testStatusForField('password', validationError)
  })

  it('Should show valid email state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('email')
    Helper.testStatusForField('email')
  })

  it('Should show valid password state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('password')
    Helper.testStatusForField('password')
  })

  it('should enable submit button if form is valid', () => {
    makeSut()
    Helper.populateField('email')
    Helper.populateField('password')
    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  it('show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
  })

  it('should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(email, password)
    expect(authenticationSpy.params).toEqual({ email, password })
  })

  it('Should call authentication only once', async () => {
    const { authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth')
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(authenticationSpy.auth).toHaveBeenCalledTimes(1)
  })

  it('Should not call authentication if form is invalid', async () => {
    const validationError = faker.random.words()
    const { authenticationSpy } = makeSut({ validationError })
    jest.spyOn(authenticationSpy, 'auth')
    await simulateValidSubmit()
    expect(authenticationSpy.auth).toHaveBeenCalledTimes(0)
  })

  it('Should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    expect(screen.getByTestId('loading-wrap').children).toHaveLength(1)
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
  })

  it('Should call SetCurrentAccount and redirect to home page on success', async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit()
    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account)
    expect(history.location.pathname).toBe('/')
  })

  it('Should present error if SetCurrentAccount fails', async () => {
    const { setCurrentAccountMock } = makeSut()
    const error = new InvalidCredentialsError()
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    setCurrentAccountMock.mockImplementationOnce(() => { throw error })
    await simulateValidSubmit()
    expect(screen.getByTestId('loading-wrap').children).toHaveLength(1)
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
  })

  it('Should go to signup page', () => {
    makeSut()
    const signupLink = screen.getByTestId('signup-link')
    fireEvent.click(signupLink)
    expect(history.location.pathname).toBe('/signup')
    // expect(window.history.length).toBe(2)
  })
})
