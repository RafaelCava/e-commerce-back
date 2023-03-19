import { type CompanyModel } from './company'

export interface EmployeeModel {
  id: string
  name: string
  email: string
  password: string
  company: string | CompanyModel
  avatar?: string
  createdAt?: Date
}
