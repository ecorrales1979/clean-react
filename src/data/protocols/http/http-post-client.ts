import { HttpResponse } from '.'

export interface HttpPostParams<BodyType> {
  url: string
  body?: BodyType
}

export interface HttpPostClient<BodyType, ResponseType> {
  post: (
    params: HttpPostParams<BodyType>
  ) => Promise<HttpResponse<ResponseType>>
}
