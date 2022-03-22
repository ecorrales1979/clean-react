import { HttpResponse } from '.'

export interface HttpGetParams {
  url: string
  headers?: Record<string, any>
}

export interface HttpGetClient<ResponseType> {
  get: (params: HttpGetParams) => Promise<HttpResponse<ResponseType>>
}
