import React from 'react'
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import faker from '@faker-js/faker'

import SignUp from './signup'
import { Helper, ValidationSpy } from '@/presentation/mocks'

interface SutTypes {
  sut: RenderResult
}

interface SutParams {
  validationError?: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  validationSpy.errorMessage = params?.validationError ?? ''
  const sut = render(<SignUp
    validation={validationSpy}
  />)

  return {
    sut
  }
}

const populateField = (sut: RenderResult, fieldName: string, value = faker.random.word()): void => {
  const input = sut.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}

describe('SignUp page', () => {
  afterEach(cleanup)

  it('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const { sut } = makeSut({ validationError })
    Helper.testChildCount(sut, 'loading-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })

  it('Should show name error if Validation fails', () => {
    const validationError = faker.random.words()
    const { sut } = makeSut({ validationError })
    populateField(sut, 'name', '')
    Helper.testStatusForField(sut, 'name', validationError)
  })
})
