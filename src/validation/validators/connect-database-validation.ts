/* eslint-disable @typescript-eslint/ban-types */
import { ServerError } from '@/presentation/errors'
import { type Validation } from '@/presentation/protocols'

export class ConnectDatabaseValidation implements Validation {
  constructor (private readonly handleValidation: Function) {}
  validate (input: any): Error {
    if (!this.handleValidation()) {
      return new ServerError('Database not connected')
    }
  }
}
