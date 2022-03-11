import axios, { AxiosResponse } from 'axios'

import {
  HttpGetClient,
  HttpGetParams,
  HttpPostClient,
  HttpPostParams,
  HttpResponse
} from '@/data/protocols/http'

export class AxiosHttpClient implements HttpPostClient<unknown, unknown>, HttpGetClient<unknown> {
  private responseAdapter (response: AxiosResponse<any>): HttpResponse<any> {
    return {
      statusCode: response.status,
      body: response.data
    }
  }

  async post (params: HttpPostParams<unknown>): Promise<HttpResponse<any>> {
    let axiosResponse: AxiosResponse<any>

    try {
      axiosResponse = await axios.post(params.url, params.body)
    } catch (error: any) {
      axiosResponse = error.response
    }

    return this.responseAdapter(axiosResponse)
  }

  async get (params: HttpGetParams): Promise<HttpResponse<any>> {
    let axiosResponse: AxiosResponse<any>

    try {
      axiosResponse = await axios.get(params.url)
    } catch (error: any) {
      axiosResponse = error.response
    }

    return this.responseAdapter(axiosResponse)
  }
}
