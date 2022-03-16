import faker from '@faker-js/faker'

import { setCurrentAccountAdapter } from './current-account-adapter'
import { UnexpectedError } from '@/domain/errors'
import { mockAccountModel } from '@/domain/mocks'
import { AccountModel } from '@/domain/models'
import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter'

jest.mock('@/infra/cache/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  beforeEach(
    () => jest.clearAllMocks()
  )

  it('Should call LocalStorageAdapter with correct values', () => {
    const account = mockAccountModel()
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
    setCurrentAccountAdapter(account)
    expect(setSpy).toHaveBeenCalledWith('account', account)
  })

  it('Should throw UnexpectedError if an invalid account is provided', () => {
    const account = { invalidProperty: faker.random.words() } as unknown as AccountModel
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')
    expect(() => setCurrentAccountAdapter(account)).toThrowError(new UnexpectedError())
    expect(setSpy).toHaveBeenCalledTimes(0)
  })
})