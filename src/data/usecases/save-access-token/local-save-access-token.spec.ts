import faker from '@faker-js/faker'

import { LocalSaveAccessToken } from './local-save-access-token'
import { SetStorageSpy } from '@/data/mocks/mock-storage'

interface SutTypes {
  sut: LocalSaveAccessToken
  setStorageSpy: SetStorageSpy
}

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageSpy()
  const sut = new LocalSaveAccessToken(setStorageSpy)
  return {
    sut,
    setStorageSpy
  }
}

describe('LocalSaveAccessToken', () => {
  it('Should call SetStorage with correct value', async () => {
    const accessToken = faker.datatype.uuid()
    const { sut, setStorageSpy } = makeSut()
    await sut.save(accessToken)
    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
