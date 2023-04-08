import { type Validation } from '@/presentation/protocols'
import { ConnectDatabaseValidation, ValidationComposite } from '@/validation/validators'

export const makeHealthCheckValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new ConnectDatabaseValidation())
  return new ValidationComposite(validations)
}
