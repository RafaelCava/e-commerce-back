import { type EmailValidator } from '../../../../../src/presentation/protocols'
import { SignUpController } from '../../../../../src/presentation/controllers/login/signup/signup'
import { MissingParamError, InvalidParamError } from '../../../../../src/presentation/errors'
import { badRequest } from '../../../../../src/presentation/helpers/http-helper'
import { EmailValidatorSpy } from '../../../mocks/email-validator'

type SutTypes = {
  sut: SignUpController
  emailValidatorSpy: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = EmailValidatorSpy()
  const sut = new SignUpController(emailValidatorSpy)
  return {
    sut,
    emailValidatorSpy
  }
}

describe('SignUp Controller', () => {
  it('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  it('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  it('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@gmail.com',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })

  it('Should return 400 if no passwordConfirmation is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('passwordConfirmation')))
  })

  it('Should return 400 if an invalid email is provided', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
  })

  it('Should call EmailValidator with correct values', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorSpy, 'isValid')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toBeCalledWith(httpRequest.body.email)
    expect(isValidSpy).toBeCalledTimes(1)
  })
})
