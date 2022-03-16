import React, { useContext } from 'react'
import { Navigate, RouteProps } from 'react-router-dom'

import { ApiContext } from '@/presentation/contexts'

const PrivateRoute = ({ children }: RouteProps): any => {
  const { getCurrentAccount } = useContext(ApiContext)

  const accessToken = getCurrentAccount()?.accessToken

  return accessToken ? children : <Navigate to="/login" replace />
}

export default PrivateRoute
