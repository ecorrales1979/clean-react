import { createContext } from 'react'

import { AccountModel } from '@/domain/models'

interface ContextProps {
  setCurrentAccount: (account: AccountModel) => void
  getCurrentAccount?: () => AccountModel
}

export default createContext<ContextProps>(null as unknown as ContextProps)
