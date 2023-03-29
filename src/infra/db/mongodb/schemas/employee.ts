import { type Employee as EmployeeModel } from '../../../../domain/models'
import { Roles } from '../../../../domain/enums'
import { Schema } from 'mongoose'

export const Employee = new Schema<EmployeeModel>({
  name: String,

  email: String,

  password: String,

  logo: String,

  role: {
    type: String,
    default: Roles.EMPLOYEE
  }
}, {
  timestamps: true
})
