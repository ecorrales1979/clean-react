import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom'
import { createMemoryHistory, MemoryHistory } from 'history'

import { Header } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'

interface SutType {
  history: MemoryHistory
  setCurrentAccountMock: any
}

const makeSut = (): SutType => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccountMock = jest.fn()
  render(
      <ApiContext.Provider value={{
        setCurrentAccount: setCurrentAccountMock,
        getCurrentAccount: jest.fn()
      }}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </ApiContext.Provider>
  )
  return { history, setCurrentAccountMock }
}

describe('Header Component', () => {
  it('Should call setCurrentAccount with null on logout', () => {
    const { history, setCurrentAccountMock } = makeSut()
    fireEvent.click(screen.getByTestId('logout'))
    expect(setCurrentAccountMock).toHaveBeenCalledWith(null)
    expect(history.location.pathname).toBe('/login')
  })
})
