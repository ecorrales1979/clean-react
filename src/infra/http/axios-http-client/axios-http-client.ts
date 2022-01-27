import axios from 'axios'

import { HttpPostParams } from '@/data/protocols/http'

export class AxiosHttpClient {
  async post (params: HttpPostParams<unknown>): Promise<void> {
    await axios.post(params.url, params.body)
  }
}
