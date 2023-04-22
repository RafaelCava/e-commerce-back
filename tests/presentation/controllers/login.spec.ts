import { mockAuthenticationParams, mockAuthenticationResult } from '@/tests/domain/mocks'
import { AuthenticationSpy } from '../mocks'
import { LoginController } from '@/presentation/controllers'
import { ok, serverError, unauthorized } from '@/presentation/helpers/http-helper'
import { ServerError, UnauthorizedError } from '@/presentation/errors'

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
      authenticationSpy.throwError = true
      const result = await sut.handle(mockAuthenticationParams())
      expect(result).toEqual(serverError(new ServerError(null)))
    })

    it('should return unauthorized error if authentication return null', async () => {
      const { sut, authenticationSpy } = makeSut()
      authenticationSpy.returnNull = true
      const result = await sut.handle(mockAuthenticationParams())
      expect(result).toEqual(unauthorized(new UnauthorizedError()))
    })

    it('should return accessToken on succeeds', async () => {
      const { sut } = makeSut()
      const result = await sut.handle(mockAuthenticationParams())
      expect(result).toEqual(ok(mockAuthenticationResult()))
    })
  })
})
