import { AccountModel } from '../models/account-model'

export interface AuthenticationParams {
  email: string
  password: string
}

export interface Autentication {
  auth: (params: AuthenticationParams) => Promise<AccountModel>
}
