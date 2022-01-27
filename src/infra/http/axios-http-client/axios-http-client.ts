import axios from 'axios'

import { HttpPostClient, HttpPostParams, HttpResponse } from '@/data/protocols/http'

export class AxiosHttpClient implements HttpPostClient<unknown, unknown> {
  async post (params: HttpPostParams<unknown>): Promise<HttpResponse<unknown>> {
    const result = await axios.post<HttpResponse<unknown>>(params.url, params.body)
    return {
      statusCode: result.status,
      body: result.data
    }
  }
}
