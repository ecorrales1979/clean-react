import React from 'react'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import faker from '@faker-js/faker'

import Login from './login'
import { ValidationSpy } from '@/presentation/mocks'

interface SutTypes {
  sut: RenderResult
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = render(<Login validation={validationSpy} />)

  return {
    sut,
    validationSpy
  }
}

describe('Login page', () => {
  afterEach(cleanup)

  it('Should start with initial state', () => {
    const { sut } = makeSut()
    const loadingWrap = sut.getByTestId('loading-wrap')
    expect(loadingWrap.childElementCount).toBe(0)
    const submitBtn = sut.getByTestId('submit') as HTMLButtonElement
    expect(submitBtn.disabled).toBe(true)
    const emailStatus = sut.getByTestId('email-status')
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')
    const passwordStatus = sut.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Campo obrigatório')
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
})
