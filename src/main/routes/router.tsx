/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { getCurrentAccountAdapter, setCurrentAccountAdapter } from '@/main/adapters'
import {
  makeLogin as Login,
  makeSignUp as SignUp,
  makeSurveyList as SurveyList
} from '@/main/factories/pages'
import { PrivateRoute } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider value={{
      setCurrentAccount: setCurrentAccountAdapter,
      getCurrentAccount: getCurrentAccountAdapter
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<PrivateRoute><SurveyList /></PrivateRoute> } />
        </Routes>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
