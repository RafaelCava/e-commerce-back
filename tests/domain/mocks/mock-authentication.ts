import { type Authentication } from '../../../src/domain/usecases'

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: 'any_mail@mail.com',
  password: 'any_value'
})
