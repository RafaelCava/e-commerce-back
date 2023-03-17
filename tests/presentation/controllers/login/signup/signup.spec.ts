import { mockAddAccountParams, mockAddAccountRequest, mockAccount } from '../../../../domain/mocks/mock-account'
import { type AddAccount } from '../../../../../src/domain/usecases/account/add-account'
import { type EmailValidator } from '../../../../../src/presentation/protocols'
import { SignUpController } from '../../../../../src/presentation/controllers/login/signup/signup'
import { MissingParamError, InvalidParamError, ServerError } from '../../../../../src/presentation/errors'
import { badRequest, serverError } from '../../../../../src/presentation/helpers/http-helper'
import { EmailValidatorSpy } from '../../../mocks/email-validator'

type SutTypes = {
  sut: SignUpController
  emailValidatorSpy: EmailValidator
  addAccountSpy: AddAccount
}

const AddAccountSpy = (): AddAccount => {
  class AddAccountSpy implements AddAccount {
    async add (account: AddAccount.Params): Promise<AddAccount.Result> {
      return await Promise.resolve(mockAccount())
    }
  }

  return new AddAccountSpy()
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = EmailValidatorSpy()
  const addAccountSpy = AddAccountSpy()
  const sut = new SignUpController(emailValidatorSpy, addAccountSpy)
  return {
    sut,
    emailValidatorSpy,
    addAccountSpy
  }
}

const throwError = (): never => {
  throw new Error()
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
})
