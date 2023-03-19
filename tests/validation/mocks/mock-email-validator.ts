import { type EmailValidator } from '../../../src/presentation/protocols/email-validator'

export const EmailValidatorSpy = (): EmailValidator => {
  class EmailValidatorSpy implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorSpy()
}
