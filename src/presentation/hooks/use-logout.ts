import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { Authentication } from '@/domain/usecases'
import { ApiContext } from '@/presentation/contexts'

type ResultType = () => void

export const useLogout = (): ResultType => {
  const { setCurrentAccount } = useContext(ApiContext)
  const navigate = useNavigate()

  return (): void => {
    setCurrentAccount(null as unknown as Authentication.Model)
    navigate('/login')
  }
}
