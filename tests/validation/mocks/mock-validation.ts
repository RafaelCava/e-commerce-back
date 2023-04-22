import { type Validation } from '@/presentation/protocols'

export const ValidationStub = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

export class ValidationSpy<T = any> implements Validation<T> {
  input?: T
  returnError = false
  count = 0
  validate (input: T): Error {
    this.input = input
    this.count++
    if (this.returnError) return new Error('any_field')
    return null
  }
}
