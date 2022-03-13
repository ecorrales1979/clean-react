import { AccountModel } from '../models'

export interface UpdateCurrentAccount {
  save: (account?: AccountModel) => void
}
