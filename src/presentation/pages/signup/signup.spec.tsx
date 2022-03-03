import React from 'react'
import { render, RenderResult } from '@testing-library/react'

import SignUp from './signup'
import { Helper } from '@/presentation/mocks'

interface SutTypes {
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const sut = render(<SignUp />)

  return {
    sut
  }
}

describe('SignUp page', () => {
  it('Should start with initial state', () => {
    const { sut } = makeSut()
    const validationError = 'Campo obrigatório'
    Helper.testChildCount(sut, 'loading-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', validationError)
    Helper.testStatusForField(sut, 'password', validationError)
    Helper.testStatusForField(sut, 'passwordConfirmation', validationError)
  })
})
