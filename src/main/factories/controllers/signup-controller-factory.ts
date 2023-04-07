import { SignUpController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { makeDbAddEmployee, makeDbAddCompany, makeDbAuthentication } from '../usecases'
import { makeSignUpValidation } from '../validators'

export const makeSignUpController = (): Controller => {
  return new SignUpController(makeSignUpValidation(), makeDbAddEmployee(), makeDbAddCompany(), makeDbAuthentication())
}
