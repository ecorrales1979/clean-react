import faker from '@faker-js/faker'

import { mockAccountModel } from '@/domain/mocks/mock-account'
import { AddAccount } from '@/domain/usecases'

export const mockAddAccountParams = (): AddAccount.Params => {
  const password = faker.internet.password()

  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

export const mockAddAccountModel = (): AddAccount.Model => mockAccountModel()
