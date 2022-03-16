import React from 'react'
import { Navigate, RouteProps } from 'react-router-dom'

const PrivateRoute = (props: RouteProps): any => {
  return <Navigate to="/login" />
}

export default PrivateRoute
