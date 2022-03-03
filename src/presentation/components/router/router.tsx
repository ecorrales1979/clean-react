import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { SignUp } from '@/presentation/pages'

interface Props {
  makeLogin: React.FC
}

const Router: React.FC<Props> = ({ makeLogin: Login }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
