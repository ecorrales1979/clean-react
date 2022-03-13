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
  it('Should call SetStorage with correct value', () => {
    const account = mockAccountModel()
    const { sut, setStorageMock } = makeSut()
    sut.save(account)
    expect(setStorageMock.key).toBe('account')
    expect(setStorageMock.value).toBe(JSON.stringify(account))
  })

  it('Should throw if SetStorage throws', () => {
    const { sut, setStorageMock } = makeSut()
    jest.spyOn(setStorageMock, 'set').mockImplementationOnce(() => { throw new Error() })
    expect(() => sut.save(mockAccountModel())).toThrow(new Error())
  })

  it('Should throw if account is falsy', () => {
    const { sut } = makeSut()
    expect(() => sut.save(undefined)).toThrow(new UnexpectedError())
  })
})
