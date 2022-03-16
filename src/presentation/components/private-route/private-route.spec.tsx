import React from 'react'
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render } from '@testing-library/react'

import PrivateRoute from './private-route'

describe('PrivateRoute', () => {
  it('Should redirect to /login if no accessToken is present', () => {
    const history = createMemoryHistory({ initialEntries: ['/'] })
    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<PrivateRoute />} />
          <Route path="/login" />
        </Routes>
      </HistoryRouter>
    )
    expect(history.location.pathname).toBe('/login')
  })
})
