import { AddAccount } from '@/domain/usecases/add-account'
import { mockAddAccountModel } from '@/domain/mocks'

export default class AddAccountSpy implements AddAccount {
  account = mockAddAccountModel()
  params!: AddAccount.Params
  async add (params: AddAccount.Params): Promise<AddAccount.Model> {
    this.params = params
    return await Promise.resolve(this.account)
  }
}
