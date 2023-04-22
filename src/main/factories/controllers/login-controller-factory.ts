import { LoginController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { makeLoginValidation } from '@/main/factories/validators'
import { makeDbAuthentication } from '@/main/factories/usecases'

export const makeLoginController = (): Controller => {
  return new LoginController(makeLoginValidation(), makeDbAuthentication())
}
