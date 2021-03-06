import axios from 'axios'

import { AxiosHttpClient } from './axios-http-client'
import { mockGetRequest, mockPostRequest } from '@/data/mocks'
import { mockAxios, mockHttpResponse } from '@/infra/mocks'

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
  describe('Post', () => {
    it('should call axios.post with correct values', async () => {
      const request = mockPostRequest()
      const { mockedAxios, sut } = makeSut()
      await sut.post(request)
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    it('should return correct response on axios.post success', async () => {
      const { mockedAxios, sut } = makeSut()
      const result = await sut.post(mockPostRequest())
      const axiosResponse = await mockedAxios.post.mock.results[0].value
      expect(result).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      })
    })

    it('Should return correct error on axios.post failure', () => {
      const { mockedAxios, sut } = makeSut()
      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse()
      })
      const result = sut.post(mockPostRequest())
      expect(result).toEqual(mockedAxios.post.mock.results[0].value)
    })
  })

  describe('Get', () => {
    it('Should call axios.get with correct values', async () => {
      const request = mockGetRequest()
      const { mockedAxios, sut } = makeSut()
      await sut.get(request)
      expect(mockedAxios.get).toHaveBeenCalledWith(request.url, { headers: request.headers })
    })

    it('should return correct response on axios.get success', async () => {
      const { mockedAxios, sut } = makeSut()
      const result = await sut.get(mockGetRequest())
      const axiosResponse = await mockedAxios.get.mock.results[0].value
      expect(result).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      })
    })

    it('Should return correct error on axios.get failure', () => {
      const { mockedAxios, sut } = makeSut()
      mockedAxios.get.mockRejectedValueOnce({
        response: mockHttpResponse()
      })
      const result = sut.get(mockGetRequest())
      expect(result).toEqual(mockedAxios.get.mock.results[0].value)
    })
  })
})
