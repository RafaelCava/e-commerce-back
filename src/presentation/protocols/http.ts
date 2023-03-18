export interface HttpRequest<B> {
  body?: B
}

export interface HttpResponse<B> {
  statusCode: number
  body: B
}
