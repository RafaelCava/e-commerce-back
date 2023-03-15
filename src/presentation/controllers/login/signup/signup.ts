export class SignUpController {
  async handle (httpRequest: any): Promise<any> {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400
      }
    }
    return await Promise.resolve(null)
  }
}
