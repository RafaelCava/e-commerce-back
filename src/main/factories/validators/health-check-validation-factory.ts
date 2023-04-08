import { type Validation } from '@/presentation/protocols'
import { ValidationComposite } from '@/validation/validators'

export const makeHealthCheckValidation = (): ValidationComposite => {
  const validations: Validation[] = []

  return new ValidationComposite(validations)
}
