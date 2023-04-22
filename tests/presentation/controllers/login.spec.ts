import { mockAuthenticationParams, throwError } from '@/tests/domain/mocks'
import { AuthenticationSpy } from '../mocks'
import { LoginController } from '@/presentation/controllers'
import { serverError } from '@/presentation/helpers/http-helper'
import { ServerError } from '@/presentation/errors'

type SutTypes = {
  sut: LoginController
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const sut = new LoginController(authenticationSpy)
  return {
    sut,
    authenticationSpy
  }
}

describe('Login Controller', () => {
  describe('authentication', () => {
    it('should call authentication with correct values', async () => {
      const { sut, authenticationSpy } = makeSut()
      const params = mockAuthenticationParams()
      await sut.handle(params)
      expect(authenticationSpy.params).toEqual(params)
      expect(authenticationSpy.counter).toBe(1)
    })

    it('should return serverError if authentication throws', async () => {
      const { sut, authenticationSpy } = makeSut()
      jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
      const result = await sut.handle(mockAuthenticationParams())
      expect(result).toEqual(serverError(new ServerError(null)))
    })
  })
})
