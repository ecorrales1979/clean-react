import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AccessDeniedError } from '@/domain/errors'
import { Authentication } from '@/domain/usecases'
import { ApiContext } from '@/presentation/contexts'

type CallbackType = (error: Error) => void

export const useErrorHandler = (callback: CallbackType): CallbackType => {
  const { setCurrentAccount } = useContext(ApiContext)
  const navigate = useNavigate()

  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount(null as unknown as Authentication.Model)
      navigate('/login')
    } else {
      callback(error)
    }
  }
}
