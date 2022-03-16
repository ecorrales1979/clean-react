import React from 'react'
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { render, RenderResult } from '@testing-library/react'

import PrivateRoute from './private-route'

interface SutTypes {
  history: MemoryHistory
  sut: RenderResult
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const sut = render(
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<PrivateRoute />} />
        <Route path="/login" />
      </Routes>
    </HistoryRouter>
  )

  return { sut, history }
}

describe('PrivateRoute', () => {
  it('Should redirect to /login if no accessToken is present', () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe('/login')
  })
})
