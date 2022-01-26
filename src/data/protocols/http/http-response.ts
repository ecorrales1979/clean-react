export enum HttpStatusCode {
  success = 200,
  unauthorized = 401
}

export interface HttpResponse {
  statusCode: HttpStatusCode
  body?: unknown
}
