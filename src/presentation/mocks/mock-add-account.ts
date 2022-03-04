import { AddAccount, AddAccountParams } from '@/domain/usecases/add-account'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/mocks'

export default class AddAccountSpy implements AddAccount {
  account = mockAccountModel()
  params!: AddAccountParams
  async add (params: AddAccountParams): Promise<AccountModel | undefined> {
    this.params = params
    return await Promise.resolve(this.account)
  }
}
