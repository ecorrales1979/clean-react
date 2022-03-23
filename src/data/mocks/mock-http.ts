import faker from '@faker-js/faker'

import {
  HttpGetClient,
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatusCode
} from '@/data/protocols/http'

export const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.datatype.json()
})

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url(),
  headers: JSON.parse(faker.datatype.json())
})

export class HttpPostClientSpy<BodyType, ResponseType>
implements HttpPostClient<BodyType, ResponseType> {
  url?: string
  body?: BodyType
  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.success
  }

  async post (
    params: HttpPostParams<BodyType>
  ): Promise<HttpResponse<ResponseType>> {
    this.url = params.url
    this.body = params.body
    return await Promise.resolve(this.response)
  }
}

export class HttpGetClientSpy<ResponseType> implements HttpGetClient<ResponseType> {
  url?: string
  headers?: any
  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.success
  }

  async get (params: HttpGetParams): Promise<HttpResponse<ResponseType>> {
    this.url = params.url
    this.headers = params.headers
    return this.response
  }
}
