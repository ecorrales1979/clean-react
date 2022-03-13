import { createContext } from 'react'

import { AccountModel } from '@/domain/models'

interface ContextProps {
  setCurrentAccount: (account: AccountModel) => void
}

export default createContext<ContextProps>(null as unknown as ContextProps)
