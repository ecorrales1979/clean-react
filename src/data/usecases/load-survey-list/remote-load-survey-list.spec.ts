import faker from '@faker-js/faker'

import { RemoteLoadSurveyList } from './remote-load-survey-list'
import { HttpGetClientSpy } from '@/data/mocks'

interface SutType {
  sut: RemoteLoadSurveyList
  httpGetClientSpy: HttpGetClientSpy
}

const makeSut = (url = faker.internet.url()): SutType => {
  const httpGetClientSpy = new HttpGetClientSpy()
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
})
