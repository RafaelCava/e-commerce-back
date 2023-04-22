import { mockAuthenticationParams, mockAuthenticationResult } from '@/tests/domain/mocks'
import { ValidationSpy } from '@/tests/validation/mocks'
import { AuthenticationSpy } from '@/tests/presentation/mocks'
import { LoginController } from '@/presentation/controllers'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers/http-helper'
import { MissingParamError, ServerError, UnauthorizedError } from '@/presentation/errors'
import { type Validation } from '@/presentation/protocols'

type SutTypes = {
  sut: LoginController
  authenticationSpy: AuthenticationSpy
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const authenticationSpy = new AuthenticationSpy()
  const validationStub = ValidationSpy()
  const sut = new LoginController(validationStub, authenticationSpy)
  return {
    sut,
    authenticationSpy,
    validationStub
  }
}

describe('Login Controller', () => {
  describe('Validation', () => {
    it('Should call Validation with correct value', async () => {
      const { sut, validationStub } = makeSut()
      const validateSpy = jest.spyOn(validationStub, 'validate')
      const params = mockAuthenticationParams()
      await sut.handle(params)
      expect(validateSpy).toHaveBeenCalledWith(params)
    })

    it('Should return 400 if Validation throws an error', async () => {
      const { sut, validationStub } = makeSut()
      jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
      const httpResponse = await sut.handle(mockAuthenticationParams())
      expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
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
