import faker from '@faker-js/faker'
import axios from 'axios'

import { AxiosHttpClient } from './axios-http-client'
import { HttpPostParams } from '@/data/protocols/http/http-post-client'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): { sut: AxiosHttpClient } => {
  const sut = new AxiosHttpClient()
  return { sut }
}

const mockHttpRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.datatype.json()
})

describe('AxiosHttpClient', () => {
  it('should call Axios with correct values', async () => {
    const request = mockHttpRequest()
    const { sut } = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })
})
