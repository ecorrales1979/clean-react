import faker from '@faker-js/faker'

import { RemoteAuthentication } from './remote-authentication'
import { HttpPostClientSpy } from '@/data/mocks'
import { HttpStatusCode } from '@/data/protocols/http'
import { mockAuthenticationModel, mockAuthenticationParams } from '@/domain/mocks'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { Authentication } from '@/domain/usecases'

interface SutTypes {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy<Authentication.Params, RemoteAuthentication.Model>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<Authentication.Params, RemoteAuthentication.Model>()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)
  return { sut, httpPostClientSpy }
}

describe('RemoteAuthentication', () => {
  it('should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { httpPostClientSpy, sut } = makeSut(url)
    await sut.auth(mockAuthenticationParams())
    expect(httpPostClientSpy.url).toBe(url)
  })

  it('should call HttpPostClient with corrent body', async () => {
    const authenticationParams = mockAuthenticationParams()
    const { httpPostClientSpy, sut } = makeSut()
    await sut.auth(authenticationParams)
    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })

  it('should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  it('should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return an Authentication.Model if HttpPostClient returns 200', async () => {
    const response = mockAuthenticationModel()
    const { httpPostClientSpy, sut } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.success,
      body: response
    }
    const result = await sut.auth(mockAuthenticationParams())
    expect(result).toEqual(response)
  })
})
