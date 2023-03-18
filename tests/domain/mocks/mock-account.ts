import { type SignUpController } from './../../../src/presentation/controllers/login/signup/signup'
import { type Authentication } from '../../../src/domain/usecases/account/authentication'
import { type AddAccount } from '../../../src/domain/usecases/account/add-account'
import { type AccountModel } from '../../../src/domain/models/account'

export const mockAccount = (): AccountModel => ({
  email: 'any_mail@mail.com',
  id: 'any_id',
  name: 'any_name',
  password: 'any_password'
})

export const mockSignUpControllerRequest = (): SignUpController.Request => ({
  email: 'any_mail@mail.com',
  name: 'any_name',
  password: 'any_password',
  passwordConfirmation: 'any_password'
})

export const mockAddAccountParams = (): AddAccount.Params => ({
  email: 'any_mail@mail.com',
  name: 'any_name',
  password: 'any_password'
})

export const mockAuthenticationResult = (): Authentication.result => ({
  access_token: 'any_token',
  name: 'any_name'
})
