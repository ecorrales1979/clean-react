import { Authentication } from '@/domain/usecases/authentication'
import { mockAuthenticationModel } from '@/domain/mocks'

export default class AuthenticationSpy implements Authentication {
  account = mockAuthenticationModel()
  params!: Authentication.Params
  async auth (params: Authentication.Params): Promise<Authentication.Model> {
    this.params = params
    return await Promise.resolve(this.account)
  }
}
