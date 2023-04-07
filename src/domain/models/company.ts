export interface Company {
  id: string

  name: string

  email: string

  cnpj?: string

  logo?: string

  createdAt?: Date

  updatedAt?: Date

  address?: Address

  plan: string

  active: boolean
}

export interface Address {
  street: string

  number: string

  complement?: string

  neighborhood: string

  city: string

  state: string
}
