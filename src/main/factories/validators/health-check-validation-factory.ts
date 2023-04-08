import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { type Validation } from '@/presentation/protocols'
import { ConnectDatabaseValidation, ValidationComposite } from '@/validation/validators'

export const makeHealthCheckValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  validations.push(new ConnectDatabaseValidation(MongoHelper.isConnected))
  return new ValidationComposite(validations)
}
