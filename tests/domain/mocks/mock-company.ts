import { type AddCompany } from '../../../src/domain/usecases/company/add-company'
import { type CompanyModel } from '../../../src/domain/models/company'
export const mockCompany = (): CompanyModel => ({
  id: 'any_id',
  name: 'any_name'
})

export const mockAddCompanyParams = (): AddCompany.Params => ({
  email: 'any_mail@mail.com',
  name: 'any_name'
})
