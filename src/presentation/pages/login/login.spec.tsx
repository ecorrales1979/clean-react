import React from 'react'
import { render } from '@testing-library/react'

import Login from './login'

describe('Login page', () => {
  it('Should start with initial state', () => {
    const { getByTestId } = render(<Login />)
    const loadingWrap = getByTestId('loading-wrap')
    expect(loadingWrap.childElementCount).toBe(0)
    const submitBtn = getByTestId('submit') as HTMLButtonElement
    expect(submitBtn.disabled).toBe(true)
  })
})
