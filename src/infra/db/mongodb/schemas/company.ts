import { Schema } from 'mongoose'
import { type Company as CompanyModel } from '@/domain/models'

export const Company = new Schema<CompanyModel>({
  name: {
    required: true,
    type: String
  },

  email: {
    required: true,
    type: String,
    unique: true
  },

  plan: {
    type: String,
    default: 'trial'
  },

  active: {
    type: Boolean,
    default: true
  },

  cnpj: {
    type: String,
    unique: true
  },

  logo: String,

  address: Schema.Types.Mixed
}, {
  timestamps: true
})
