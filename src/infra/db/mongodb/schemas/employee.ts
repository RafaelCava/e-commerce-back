import { type Employee as EmployeeModel } from '@/domain/models'
import { Roles } from '@/domain/enums'
import { Schema } from 'mongoose'

export const Employee = new Schema<EmployeeModel>({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  company: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Companies'
  },

  logo: String,

  role: {
    type: String,
    default: Roles.EMPLOYEE
  },

  accessToken: {
    type: String,
    default: null
  }
}, {
  timestamps: true
})
