import React from 'react'
import { render } from '@testing-library/react'

import Login from './login'

describe('Login page', () => {
  it('Should not render spinner and error on start', () => {
    const { getByTestId } = render(<Login />)
    const loadingWrap = getByTestId('loading-wrap')
    expect(loadingWrap.childElementCount).toBe(0)
  })
})
