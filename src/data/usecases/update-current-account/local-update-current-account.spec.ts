import { LocalUpdateCurrentAccount } from './local-update-current-account'
import { SetStorageMock } from '@/data/mocks'
import { UnexpectedError } from '@/domain/errors'
import { mockAccountModel } from '@/domain/mocks'

interface SutTypes {
  sut: LocalUpdateCurrentAccount
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalUpdateCurrentAccount(setStorageMock)
  return {
    sut,
    setStorageMock
  }
}

describe('LocalUpdateCurrentAccount', () => {
  it('Should call SetStorage with correct value', async () => {
    const account = mockAccountModel()
    const { sut, setStorageMock } = makeSut()
    await sut.save(account)
    expect(setStorageMock.key).toBe('account')
    expect(setStorageMock.value).toBe(JSON.stringify(account))
  })

  it('Should throw if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut()
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error())
    const result = sut.save(mockAccountModel())
    await expect(result).rejects.toThrow(new Error())
  })

  it('Should throw if account is falsy', async () => {
    const { sut } = makeSut()
    const result = sut.save(undefined)
    await expect(result).rejects.toThrow(new UnexpectedError())
  })
})
