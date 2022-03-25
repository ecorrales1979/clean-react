import faker from '@faker-js/faker'

import { RemoteAddAccount } from './remote-add-account'
import { HttpPostClientSpy } from '@/data/mocks'
import { AddAccount } from '@/domain/usecases'
import { mockAddAccountModel, mockAddAccountParams } from '@/domain/mocks'
import { HttpStatusCode } from '@/data/protocols/http'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'

interface SutTypes {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AddAccount.Params, RemoteAddAccount.Model>
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<
  AddAccount.Params,
  RemoteAddAccount.Model
  >()
  const sut = new RemoteAddAccount(url, httpPostClientSpy)
  return { sut, httpPostClientSpy }
}

describe('', () => {
  it('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { httpPostClientSpy, sut } = makeSut(url)
    await sut.add(mockAddAccountParams())
    expect(httpPostClientSpy.url).toBe(url)
  })

  it('Should call HttpPostClient with corrent body', async () => {
    const addAccountParams = mockAddAccountParams()
    const { httpPostClientSpy, sut } = makeSut()
    await sut.add(addAccountParams)
    expect(httpPostClientSpy.body).toEqual(addAccountParams)
  })

  it('should throw EmailInUseError if HttpPostClient returns 403', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  it('should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { httpPostClientSpy, sut } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('should return a RemoteAddAccount.Model if HttpPostClient returns 200', async () => {
    const response = mockAddAccountModel()
    const { httpPostClientSpy, sut } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.success,
      body: response
    }
    const result = await sut.add(mockAddAccountParams())
    expect(result).toEqual(response)
  })
})
