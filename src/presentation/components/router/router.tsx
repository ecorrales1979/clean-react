import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Login } from '@/presentation/pages'

const Router: React.FC = ({ children }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
