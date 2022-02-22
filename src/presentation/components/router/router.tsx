import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

interface Props {
  makeLogin: React.FC
}

const Router: React.FC<Props> = ({ makeLogin: Login }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
