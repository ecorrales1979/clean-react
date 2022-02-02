import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Login } from '@/presentation/pages'
import { Validation } from '../../protocols/validation'

const Router: React.FC = ({ children }) => {
  return (
    <BrowserRouter>
      <Routes>
        {/* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */}
        <Route path="login" element={<Login validation={{} as Validation} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
