import { EmailValidation } from '../../../src/validation/validators'
import { type EmailValidator } from '../protocols/email-validator'
import { EmailValidatorSpy } from '../mocks'
import { InvalidParamError } from '../../../src/presentation/errors'

type SutTypes = {
  sut: EmailValidation
  emailValidatorSpy: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = EmailValidatorSpy()
  const sut = new EmailValidation('email', emailValidatorStub)
  return { sut, emailValidatorSpy: emailValidatorStub }
}

describe('Email Validation', () => {
  test('Should returns an error if EmailValidator returns false', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ email: 'any_email@mail.com' })
    expect(error).toEqual(new InvalidParamError('email'))
  })

  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorSpy } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorSpy, 'isValid')
    sut.validate({ email: 'any_email@mail.com' })
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throws if EmailValidator throws', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(() => { throw new Error() })
    expect(sut.validate).toThrow()
  })
})
