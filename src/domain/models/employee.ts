import { type Roles } from '../enums'
export interface Employee {
  id: string

  name: string

  email: string

  password: string

  company: string | object

  logo?: string

  role: Roles

  createdAt?: Date

  updatedAt?: Date

  accessToken?: string
}
