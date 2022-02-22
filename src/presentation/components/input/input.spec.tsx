import React from 'react'
import { render, RenderResult } from '@testing-library/react'

import { Input } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

const makeSut = (): RenderResult => {
  return render(
    <Context.Provider value={{ state: {}, setState: jest.fn() }}>
      <Input name="field" />
    </Context.Provider>
  )
}

describe('Input Component', () => {
  it('Should begin with readonly', () => {
    const sut = makeSut()
    const input = sut.getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
