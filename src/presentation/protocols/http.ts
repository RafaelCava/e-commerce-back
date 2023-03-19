export interface HttpRequest<B = any> {
  body?: B
}

export interface HttpResponse<B = any> {
  statusCode: number
  body: B
}
