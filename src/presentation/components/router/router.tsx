/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

interface Factory {
  makeLogin: React.FC
  makeSignUp: React.FC
}

const Router: React.FC<Factory> = ({ makeLogin: Login, makeSignUp: SignUp }) => {
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
