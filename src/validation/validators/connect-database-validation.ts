import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { ServerError } from '@/presentation/errors'
import { type Validation } from '@/presentation/protocols'

export class ConnectDatabaseValidation implements Validation {
  validate (input: any): Error {
    if (!MongoHelper.isConnected()) {
      return new ServerError('Database not connected')
    }
  }
}
