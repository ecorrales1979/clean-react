import React from 'react'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import faker from '@faker-js/faker'

import Login from './login'
import { ValidationSpy } from '@/presentation/mocks'
import { Authentication, AuthenticationParams } from '@/domain/usecases/authentication'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/mocks'

interface SutTypes {
  sut: RenderResult
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

interface SutParams {
  validationError?: string
}

class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params!: AuthenticationParams
  async auth (params: AuthenticationParams): Promise<AccountModel | undefined> {
    this.params = params
    return await Promise.resolve(this.account)
  }
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  validationSpy.errorMessage = params?.validationError ?? ''
  const sut = render(<Login validation={validationSpy} authentication={authenticationSpy} />)

  return {
    sut,
    validationSpy,
    authenticationSpy
  }
}

describe('Login page', () => {
  afterEach(cleanup)

  it('Should start with initial state', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const loadingWrap = sut.getByTestId('loading-wrap')
    expect(loadingWrap.childElementCount).toBe(0)
    const submitBtn = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitBtn.disabled).toBe(true)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('Should call validation with correct email value', () => {
    const emailValue = faker.internet.email()
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: emailValue } })
    expect(validationSpy.fieldname).toBe('email')
    expect(validationSpy.fieldvalue).toBe(emailValue)
  })

  it('Should call validation with correct password value', () => {
    const passwordValue = faker.internet.password()
    const { sut, validationSpy } = makeSut()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: passwordValue } })
    expect(validationSpy.fieldname).toEqual('password')
    expect(validationSpy.fieldvalue).toEqual(passwordValue)
  })

  it('Should show email error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: '' } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
  })

  it('Should show password error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: '' } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationError)
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('Should show valid email state if Validation succeeds', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Tudo certo')
    expect(emailStatus.textContent).toBe('🔵')
  })

  it('Should show valid password state if Validation succeeds', () => {
    const { sut } = makeSut()
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Tudo certo')
    expect(passwordStatus.textContent).toBe('🔵')
  })

  it('should enable submit button if form is valid', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const submitBtn = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitBtn.disabled).toBe(false)
  })

  it('show spinner on submit', () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })
    const passwordInput = sut.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })
    const submitBtn = sut.getByTestId('submit') as HTMLButtonElement
    fireEvent.click(submitBtn)
    const spinner = sut.getByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  it('should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut()
    const emailInput = sut.getByTestId('email')
    const email = faker.internet.email()
    fireEvent.input(emailInput, { target: { value: email } })
    const passwordInput = sut.getByTestId('password')
    const password = faker.internet.password()
    fireEvent.input(passwordInput, { target: { value: password } })
    const submitBtn = sut.getByTestId('submit') as HTMLButtonElement
    fireEvent.click(submitBtn)
    expect(authenticationSpy.params).toEqual({ email, password })
  })
})
