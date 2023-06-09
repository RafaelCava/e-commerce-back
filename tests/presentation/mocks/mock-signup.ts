import { type SignUpController } from '../controllers/signup'
export const mockSignUpControllerRequest = (): SignUpController.Params => ({
  email: 'any_mail@mail.com',
  name: 'any_name',
  password: 'any_password',
  passwordConfirmation: 'any_password',
  companyName: 'any_name',
  cnpj: 'any_value',
  celPhone: 'any_celPhone'
})
