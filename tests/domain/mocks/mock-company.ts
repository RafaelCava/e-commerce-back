import { type AddCompany } from '../../../src/domain/usecases'

export const mockAddCompanyParams = (): AddCompany.Params => ({
  email: 'any_mail@mail.com',
  name: 'any_name',
  celPhone: 'any_celPhone',
  cnpj: 'any_value'
})
