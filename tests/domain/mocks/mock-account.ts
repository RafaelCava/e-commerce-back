import { type AddAccount } from './../../../src/domain/usecases/account/add-account'
import { type AddAccountRequest } from '../../presentation/dto/add-account-request-dto'
import { type AccountModel } from '../../../src/domain/models/account'

export const mockAccount = (): AccountModel => ({
  email: 'any_mail@mail.com',
  id: 'any_id',
  name: 'any_name',
  password: 'any_password'
})

export const mockAddAccountRequest = (): AddAccountRequest => ({
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
