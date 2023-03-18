import { type Authentication } from '../../../../../src/domain/usecases/account/authentication'
import { type AddAccount } from '../../../../../src/domain/usecases/account/add-account'
import { mockAddAccountParams, mockAddAccountRequest, throwError } from '../../../../domain/mocks'
import { type EmailValidator } from '../../../../../src/presentation/protocols/email-validator'
import { SignUpController } from '../../../../../src/presentation/controllers/login/signup/signup'
import { MissingParamError, InvalidParamError, ServerError, EmailInUseError } from '../../../../../src/presentation/errors'
import { badRequest, serverError, forbidden } from '../../../../../src/presentation/helpers/http-helper'
import { EmailValidatorSpy, AddAccountSpy, AuthenticationSpy } from '../../../mocks'

type SutTypes = {
  sut: SignUpController
  emailValidatorSpy: EmailValidator
  addAccountSpy: AddAccount
  authenticationSpy: Authentication
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = EmailValidatorSpy()
  const addAccountSpy = AddAccountSpy()
  const authenticationSpy = AuthenticationSpy()
  const sut = new SignUpController(emailValidatorSpy, addAccountSpy, authenticationSpy)
  return {
    sut,
    emailValidatorSpy,
    addAccountSpy,
    authenticationSpy
  }
}

describe('SignUp Controller', () => {
  it('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest: unknown = {
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
    const httpRequest: unknown = {
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
    const httpRequest: unknown = {
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
    const httpRequest: unknown = {
      body: {
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('passwordConfirmation')))
  })

  it('Should return 400 if password confirmations fails', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'invalid_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('passwordConfirmation')))
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
      body: mockAddAccountRequest()
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email)
    expect(isValidSpy).toBeCalledTimes(1)
  })

  it('Should return 500 if EmailValidator throw', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(throwError)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@gmail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  it('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const addSpy = jest.spyOn(addAccountSpy, 'add')
    const httpRequest = {
      body: mockAddAccountRequest()
    }
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith(mockAddAccountParams())
    expect(addSpy).toBeCalledTimes(1)
  })

  it('Should return 500 if AddAccount throw', async () => {
    const { sut, addAccountSpy } = makeSut()
    jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(throwError)
    const httpRequest = {
      body: mockAddAccountRequest()
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  it('Should return 403 if AddAccount return null', async () => {
    const { sut, addAccountSpy } = makeSut()
    jest.spyOn(addAccountSpy, 'add').mockReturnValueOnce(Promise.resolve(null))
    const httpRequest = {
      body: mockAddAccountRequest()
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  it('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const authSpy = jest.spyOn(authenticationSpy, 'auth')
    const httpRequest = {
      body: mockAddAccountRequest()
    }
    await sut.handle(httpRequest)
    expect(authSpy).toHaveBeenCalledWith({
      email: mockAddAccountRequest().email,
      password: mockAddAccountRequest().password
    })
    expect(authSpy).toBeCalledTimes(1)
  })

  it('Should return 500 if Authentication throw', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
    const httpRequest = {
      body: mockAddAccountRequest()
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})
