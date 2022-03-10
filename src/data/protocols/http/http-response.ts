export enum HttpStatusCode {
  success = 200,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500
}

export interface HttpResponse<ResponseType> {
  statusCode: HttpStatusCode
  body?: ResponseType
}
