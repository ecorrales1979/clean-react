import faker from '@faker-js/faker'

import { LocalSaveAccessToken } from './local-save-access-token'
import { SetStorageMock } from '@/data/mocks'

interface SutTypes {
  sut: LocalSaveAccessToken
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorageMock)
  return {
    sut,
    setStorageMock
  }
}

describe('LocalSaveAccessToken', () => {
  it('Should call SetStorage with correct value', async () => {
    const accessToken = faker.datatype.uuid()
    const { sut, setStorageMock } = makeSut()
    await sut.save(accessToken)
    expect(setStorageMock.key).toBe('accessToken')
    expect(setStorageMock.value).toBe(accessToken)
  })

  it('Should throw if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut()
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error())
    const result = sut.save(faker.datatype.uuid())
    await expect(result).rejects.toThrow(new Error())
  })
})
