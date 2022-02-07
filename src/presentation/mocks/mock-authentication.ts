import {
  Authentication,
  AuthenticationParams
} from '@/domain/usecases/authentication'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/mocks'

export default class AuthenticationSpy implements Authentication {
  account = mockAccountModel()
  params!: AuthenticationParams
  async auth (params: AuthenticationParams): Promise<AccountModel | undefined> {
    this.params = params
    return await Promise.resolve(this.account)
  }
}
