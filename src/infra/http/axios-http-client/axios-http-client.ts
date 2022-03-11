import axios, { AxiosResponse } from 'axios'

import {
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse
} from '@/data/protocols/http'

export class AxiosHttpClient implements HttpPostClient<unknown, unknown> {
  async post (params: HttpPostParams<unknown>): Promise<HttpResponse<any>> {
    let axiosResponse: AxiosResponse<any>
    try {
      axiosResponse = await axios.post(params.url, params.body)
    } catch (error: any) {
      axiosResponse = error.response
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }

  async get (params: HttpGetParams): Promise<void> {
    await axios.get(params.url)
  }
}
