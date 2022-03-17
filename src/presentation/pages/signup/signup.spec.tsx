import React from 'react'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import faker from '@faker-js/faker'

import SignUp from './signup'
import { EmailInUseError } from '@/domain/errors'
import { Helper, ValidationSpy, AddAccountSpy } from '@/presentation/mocks'
import { ApiContext } from '@/presentation/contexts'
import { AccountModel } from '@/domain/models'

interface SutTypes {
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: any
}

interface SutParams {
  validationError?: string
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addAccountSpy = new AddAccountSpy()
  const setCurrentAccountMock = jest.fn()
  validationSpy.errorMessage = params?.validationError ?? ''
  render(
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountMock,
      getCurrentAccount: () => ({} as unknown as AccountModel)
    }}>
      <HistoryRouter history={history}>
        <SignUp
          validation={validationSpy}
          addAccount={addAccountSpy}
        />
      </HistoryRouter>
    </ApiContext.Provider>
  )

  return {
    addAccountSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = async (
  name = faker.name.findName(),
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  Helper.populateField('name', name)
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  Helper.populateField('passwordConfirmation', password)
  const form = screen.getByTestId('signup-form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('SignUp page', () => {
  it('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    makeSut({ validationError })
    Helper.testChildCount('loading-wrap', 0)
    Helper.testButtonIsDisabled('submit', true)
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  it('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('name', '')
    Helper.testStatusForField('name', validationError)
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

  it('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words()
    makeSut({ validationError })
    Helper.populateField('passwordConfirmation', '')
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  it('Should show valid name state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('name')
    Helper.testStatusForField('name')
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

  it('Should show valid passwordConfirmation state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation')
  })

  it('should enable submit button if form is valid', () => {
    makeSut()
    Helper.populateField('name')
    Helper.populateField('email')
    Helper.populateField('password')
    Helper.populateField('passwordConfirmation')
    Helper.testButtonIsDisabled('submit', false)
  })

  it('show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    Helper.testElementExists('spinner')
  })

  it('should call AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut()
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()
    await simulateValidSubmit(name, email, password)
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })

  it('Should call AddAccount only once', async () => {
    const { addAccountSpy } = makeSut()
    jest.spyOn(addAccountSpy, 'add')
    await simulateValidSubmit()
    await simulateValidSubmit()
    expect(addAccountSpy.add).toHaveBeenCalledTimes(1)
  })

  it('Should not call AddAccount if form is invalid', async () => {
    const validationError = faker.random.words()
    const { addAccountSpy } = makeSut({ validationError })
    jest.spyOn(addAccountSpy, 'add')
    await simulateValidSubmit()
    expect(addAccountSpy.add).toHaveBeenCalledTimes(0)
  })

  it('Should present error if AddAccount fails', async () => {
    const { addAccountSpy } = makeSut()
    const error = new EmailInUseError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    await simulateValidSubmit()
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
    Helper.testChildCount('loading-wrap', 1)
  })

  it('Should call SetCurrentAccount and redirect to home page on success', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut()
    await simulateValidSubmit()
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account)
    expect(history.location.pathname).toBe('/')
  })

  it('Should present error if SetCurrentAccount fails', async () => {
    const { setCurrentAccountMock } = makeSut()
    const error = new EmailInUseError()
    setCurrentAccountMock.mockImplementationOnce(() => { throw (error) })
    await simulateValidSubmit()
    Helper.testChildCount('loading-wrap', 1)
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
  })

  it('Should go to login page', () => {
    makeSut()
    const loginLink = screen.getByTestId('login')
    fireEvent.click(loginLink)
    expect(history.location.pathname).toBe('/login')
  })
})
