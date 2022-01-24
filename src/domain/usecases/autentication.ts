import { AccountModel } from '../models/account-model'

interface AuthenticationParams {
  email: string
  password: string
}

export interface Autentication {
  auth: (params: AuthenticationParams) => Promise<AccountModel>
}
