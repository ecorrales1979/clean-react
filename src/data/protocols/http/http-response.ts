export enum HttpStatusCode {
  success = 200,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  serverError = 500
}

export interface HttpResponse {
  statusCode: HttpStatusCode
  body?: unknown
}
