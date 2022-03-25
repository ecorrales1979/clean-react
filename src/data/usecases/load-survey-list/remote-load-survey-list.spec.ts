import faker from '@faker-js/faker'

import { RemoteLoadSurveyList } from './remote-load-survey-list'
import { HttpGetClientSpy } from '@/data/mocks'
import { HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError } from '@/domain/errors'
import { mockSurveyList } from '@/domain/mocks'

interface SutType {
  sut: RemoteLoadSurveyList
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyList.Model[]>
}

const makeSut = (url = faker.internet.url()): SutType => {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyList.Model[]>()
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)

  return { sut, httpGetClientSpy }
}

describe('RemoteLoadSurveyList', () => {
  it('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const { httpGetClientSpy, sut } = makeSut(url)
    await sut.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  })

  it('Should throw UnexpectedError if HttpGetClient returns 403', async () => {
    const { httpGetClientSpy, sut } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }
    const result = sut.loadAll()
    await expect(result).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpGetClient returns 404', async () => {
    const { httpGetClientSpy, sut } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const result = sut.loadAll()
    await expect(result).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpGetClient returns 500', async () => {
    const { httpGetClientSpy, sut } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const result = sut.loadAll()
    await expect(result).rejects.toThrow(new UnexpectedError())
  })

  it('should return a list of LoadSurveyList.Model if HttpGetClient returns 200', async () => {
    const { httpGetClientSpy, sut } = makeSut()
    const response = mockSurveyList()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.success,
      body: response
    }
    const result = await sut.loadAll()
    expect(result).toEqual(response)
  })

  it('should return an empty list if HttpGetClient returns 204', async () => {
    const { httpGetClientSpy, sut } = makeSut()
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.noContent
    }
    const result = await sut.loadAll()
    expect(result).toEqual([])
  })
})
