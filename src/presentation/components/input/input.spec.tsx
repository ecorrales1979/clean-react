import React from 'react'
import { render } from '@testing-library/react'

import { Input } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

describe('Input Component', () => {
  it('Should begin with readonly', () => {
    const { getByTestId } = render(
      <Context.Provider value={{ state: {}, setState: jest.fn() }}>
        <Input name="field" />
      </Context.Provider>
    )
    const input = getByTestId('field') as HTMLInputElement
    expect(input.readOnly).toBe(true)
  })
})
