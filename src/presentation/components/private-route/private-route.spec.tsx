import React from 'react'
import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'
import { render } from '@testing-library/react'

import PrivateRoute from './private-route'
import { mockAccountModel } from '@/domain/mocks'
import { ApiContext } from '@/presentation/contexts'
import { Login } from '@/presentation/pages'
import { AuthenticationSpy, ValidationSpy } from '@/presentation/mocks'

interface SutTypes {
  history: MemoryHistory
}

const makeSut = (account: any = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <ApiContext.Provider value={{
      setCurrentAccount: () => null,
      getCurrentAccount: () => account
    }}>
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<PrivateRoute>
            {<Login
              authentication={new AuthenticationSpy()}
              validation={new ValidationSpy()}
            />}
          </PrivateRoute> } />
          {/* <Route path="/login" element={<PrivateRoute>{Login}</PrivateRoute> } /> */}
          <Route
            path="/login"
            element={<Login
              authentication={new AuthenticationSpy()}
              validation={new ValidationSpy()}
            />}
          />
        </Routes>
      </HistoryRouter>
    </ApiContext.Provider>
  )

  return { history }
}

describe('PrivateRoute', () => {
  it('Should redirect to /login if no accessToken is present', () => {
    const { history } = makeSut(null)
    expect(history.location.pathname).toBe('/login')
  })

  it('Should render desired component if accessToken is present', () => {
    const { history } = makeSut()
    expect(history.location.pathname).toBe('/')
  })
})
