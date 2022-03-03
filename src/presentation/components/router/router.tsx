import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { SignUp } from '@/presentation/pages'
import { Validation } from '@/presentation/protocols/validation'

interface Props {
  makeLogin: React.FC
}

const Router: React.FC<Props> = ({ makeLogin: Login }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* eslint-disable-next-line @typescript-eslint/consistent-type-assertions */}
        <Route path="/signup" element={<SignUp validation={{} as Validation} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
