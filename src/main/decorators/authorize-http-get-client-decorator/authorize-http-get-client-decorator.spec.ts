import faker from '@faker-js/faker'

import { GetStorageSpy, HttpGetClientSpy, mockGetRequest } from '@/data/mocks'
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators'
import { HttpGetParams } from '@/data/protocols/http'

interface SutType {
  getStorageSpy: GetStorageSpy
  httpGetClientSpy: HttpGetClientSpy<any>
  sut: AuthorizeHttpGetClientDecorator
}

const makeSut = (): SutType => {
  const getStorageSpy = new GetStorageSpy()
  const httpGetClientSpy = new HttpGetClientSpy()
  const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy, httpGetClientSpy)
  return {
    getStorageSpy,
    httpGetClientSpy,
    sut
  }
}

describe('AuthorizeHttpGetClientDecorator', () => {
  it('Should call GetStorage with correct value', async () => {
    const { getStorageSpy, sut } = makeSut()
    await sut.get(mockGetRequest())
    expect(getStorageSpy.key).toBe('account')
  })

  it('Should not add headers if getStorage is invalid', async () => {
    const httpRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: { [faker.random.word()]: faker.random.words() }
    }
    const { httpGetClientSpy, sut } = makeSut()
    await sut.get(httpRequest)
    expect(httpGetClientSpy.url).toBe(httpRequest.url)
    expect(httpGetClientSpy.headers).toEqual(httpRequest.headers)
  })
})
