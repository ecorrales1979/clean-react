import { HttpResponse } from '.'

export interface HttpGetParams {
  url: string
}

export interface HttpGetClient<ResponseType> {
  get: (params: HttpGetParams) => Promise<HttpResponse<ResponseType>>
}
