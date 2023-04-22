import { mockAuthenticationParams } from '@/tests/domain/mocks'
import { AuthenticationSpy } from '../mocks'
import { LoginController } from '@/presentation/controllers'

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
  })
})
