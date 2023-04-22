import { mockAuthenticationParams, mockAuthenticationResult } from '@/tests/domain/mocks'
import { ValidationSpy } from '@/tests/validation/mocks'
import { AuthenticationSpy } from '@/tests/presentation/mocks'
import { LoginController } from '@/presentation/controllers'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers/http-helper'
import { ServerError, UnauthorizedError } from '@/presentation/errors'

type SutTypes = {
  sut: LoginController
  authenticationSpy: AuthenticationSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const validationSpy = new ValidationSpy()
  const sut = new LoginController(validationSpy, authenticationSpy)
  return {
    sut,
    authenticationSpy,
    validationSpy
  }
}

describe('Login Controller', () => {
  describe('Validation', () => {
    it('Should call Validation with correct value', async () => {
      const { sut, validationSpy } = makeSut()
      const params = mockAuthenticationParams()
      await sut.handle(params)
      expect(validationSpy.input).toEqual(params)
      expect(validationSpy.count).toBe(1)
    })

    it('Should return badRequest if Validation return an error', async () => {
      const { sut, validationSpy } = makeSut()
      validationSpy.returnError = true
      const httpResponse = await sut.handle(mockAuthenticationParams())
      expect(httpResponse).toEqual(badRequest(new Error('any_field')))
    })
  })
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
