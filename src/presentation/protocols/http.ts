export interface HttpResponse {
  statusCode: number
  body: any
  control?: any
}

export interface HttpRequest {
  body?: any
  control?: any
}
