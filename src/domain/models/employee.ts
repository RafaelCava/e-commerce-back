import { type Roles } from '../enums'
export interface Employee {
  name: string

  email: string

  password: string

  logo?: string

  role: Roles
}
