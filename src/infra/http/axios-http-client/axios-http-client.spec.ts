import axios from 'axios'

import { AxiosHttpClient } from './axios-http-client'
import { mockAxios } from '@/infra/mocks'
import { mockHttpRequest } from '@/data/mocks'

jest.mock('axios')

interface SutTypes {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return { sut, mockedAxios }
}

describe('AxiosHttpClient', () => {
  it('should call Axios with correct values', async () => {
    const request = mockHttpRequest()
    const { mockedAxios, sut } = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  it('should return correct statusCode and body', async () => {
    const { mockedAxios, sut } = makeSut()
    const result = await sut.post(mockHttpRequest())
    const axiosResponse = await mockedAxios.post.mock.results[0].value
    expect(result).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    })
  })
})
