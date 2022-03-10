import faker from '@faker-js/faker'

import { RemoteLoadSurveyList } from './remote-load-survey-list'
import { HttpGetClientSpy } from '@/data/mocks'

describe('RemoteLoadSurveyList', () => {
  it('Should call HttpGetClient with correct URL', async () => {
    const url = faker.internet.url()
    const httpGetClientSpy = new HttpGetClientSpy()
    const sut = new RemoteLoadSurveyList(url, httpGetClientSpy)
    await sut.loadAll()
    expect(httpGetClientSpy.url).toBe(url)
  })
})
