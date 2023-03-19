import { type AddCompany } from '../../../../../src/domain/usecases/company/add-company'
import { type Authentication } from '../../../../domain/usecases/employee/authentication'
import { type AddEmployee } from '../../../../domain/usecases/employee/add-employee'
import { mockAddEmployeeParams, throwError, mockAuthenticationResult, mockAddCompanyParams } from '../../../../domain/mocks'
import { type EmailValidator } from '../../../../../src/presentation/protocols/email-validator'
import { SignUpController } from '../../../../../src/presentation/controllers/login/signup/signup'
import { MissingParamError, InvalidParamError, ServerError, EmailInUseError } from '../../../../../src/presentation/errors'
import { badRequest, serverError, forbidden, ok } from '../../../../../src/presentation/helpers/http-helper'
import { EmailValidatorSpy, AddEmployeeSpy, AuthenticationSpy, AddCompanySpy, mockSignUpControllerRequest } from '../../../mocks'

type SutTypes = {
  sut: SignUpController
  emailValidatorSpy: EmailValidator
  addEmployeeSpy: AddEmployee
  authenticationSpy: Authentication
  addCompanySpy: AddCompany
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = EmailValidatorSpy()
  const addEmployeeSpy = AddEmployeeSpy()
  const addCompanySpy = AddCompanySpy()
  const authenticationSpy = AuthenticationSpy()
  const sut = new SignUpController(emailValidatorSpy, addEmployeeSpy, addCompanySpy, authenticationSpy)
  return {
    sut,
    emailValidatorSpy,
    addEmployeeSpy,
    addCompanySpy,
    authenticationSpy
  }
}

describe('SignUp Controller', () => {
  describe('Input Validation', () => {
    it('Should return 400 if no name is provided', async () => {
      const { sut } = makeSut()
      const httpRequest: unknown = {
        body: {
          email: 'any_email@gmail.com',
          password: 'any_password',
          passwordConfirmation: 'any_password',
          companyName: 'any_name'
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
          passwordConfirmation: 'any_password',
          companyName: 'any_name'
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
          passwordConfirmation: 'any_password',
          companyName: 'any_name'
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
          password: 'any_password',
          companyName: 'any_name'
        }
      }
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(badRequest(new MissingParamError('passwordConfirmation')))
    })

    it('Should return 400 if no companyName is provided', async () => {
      const { sut } = makeSut()
      const httpRequest: unknown = {
        body: {
          name: 'any_name',
          email: 'any_email@gmail.com',
          password: 'any_password',
          passwordConfirmation: 'any_password'
        }
      }
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(badRequest(new MissingParamError('companyName')))
    })

    it('Should return 400 if password confirmations fails', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        body: {
          name: 'any_name',
          email: 'any_email@gmail.com',
          password: 'any_password',
          passwordConfirmation: 'invalid_password',
          companyName: 'any_name'
        }
      }
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(badRequest(new InvalidParamError('passwordConfirmation')))
    })
  })

  describe('EmailValidator', () => {
    it('Should return 400 if an invalid email is provided', async () => {
      const { sut, emailValidatorSpy } = makeSut()
      jest.spyOn(emailValidatorSpy, 'isValid').mockReturnValueOnce(false)
      const httpRequest = {
        body: {
          name: 'any_name',
          email: 'invalid_email@gmail.com',
          password: 'any_password',
          passwordConfirmation: 'any_password',
          companyName: 'any_name'
        }
      }
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
    })

    it('Should call EmailValidator with correct values', async () => {
      const { sut, emailValidatorSpy } = makeSut()
      const isValidSpy = jest.spyOn(emailValidatorSpy, 'isValid')
      const httpRequest = {
        body: mockSignUpControllerRequest()
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
          passwordConfirmation: 'any_password',
          companyName: 'any_name'
        }
      }
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(serverError(new ServerError(null)))
    })
  })

  describe('AddEmployee', () => {
    it('Should call AddEmployee with correct values', async () => {
      const { sut, addEmployeeSpy } = makeSut()
      const addSpy = jest.spyOn(addEmployeeSpy, 'add')
      const httpRequest = {
        body: mockSignUpControllerRequest()
      }
      await sut.handle(httpRequest)
      expect(addSpy).toHaveBeenCalledWith(mockAddEmployeeParams())
      expect(addSpy).toBeCalledTimes(1)
    })

    it('Should return 500 if AddEmployee throw', async () => {
      const { sut, addEmployeeSpy } = makeSut()
      jest.spyOn(addEmployeeSpy, 'add').mockImplementationOnce(throwError)
      const httpRequest = {
        body: mockSignUpControllerRequest()
      }
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(serverError(new ServerError(null)))
    })

    it('Should return 403 if AddEmployee return null', async () => {
      const { sut, addEmployeeSpy } = makeSut()
      jest.spyOn(addEmployeeSpy, 'add').mockReturnValueOnce(Promise.resolve(null))
      const httpRequest = {
        body: mockSignUpControllerRequest()
      }
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
    })
  })

  describe('AddCompany', () => {
    it('Should call AddCompany with correct values', async () => {
      const { sut, addCompanySpy } = makeSut()
      const addSpy = jest.spyOn(addCompanySpy, 'add')
      const httpRequest = {
        body: mockSignUpControllerRequest()
      }
      await sut.handle(httpRequest)
      expect(addSpy).toHaveBeenCalledWith(mockAddCompanyParams())
      expect(addSpy).toBeCalledTimes(1)
    })

    it('Should return 500 if AddCompany throw', async () => {
      const { sut, addCompanySpy } = makeSut()
      jest.spyOn(addCompanySpy, 'add').mockImplementationOnce(throwError)
      const httpRequest = {
        body: mockSignUpControllerRequest()
      }
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(serverError(new ServerError(null)))
    })

    it('Should return 403 if AddCompany return null', async () => {
      const { sut, addCompanySpy } = makeSut()
      jest.spyOn(addCompanySpy, 'add').mockReturnValueOnce(Promise.resolve(null))
      const httpRequest = {
        body: mockSignUpControllerRequest()
      }
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
    })
  })

  describe('Authentication', () => {
    it('Should call Authentication with correct values', async () => {
      const { sut, authenticationSpy } = makeSut()
      const authSpy = jest.spyOn(authenticationSpy, 'auth')
      const httpRequest = {
        body: mockSignUpControllerRequest()
      }
      await sut.handle(httpRequest)
      expect(authSpy).toHaveBeenCalledWith({
        email: mockSignUpControllerRequest().email,
        password: mockSignUpControllerRequest().password
      })
      expect(authSpy).toBeCalledTimes(1)
    })

    it('Should return 500 if Authentication throw', async () => {
      const { sut, authenticationSpy } = makeSut()
      jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
      const httpRequest = {
        body: mockSignUpControllerRequest()
      }
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(serverError(new ServerError(null)))
    })

    it('Should return 200 if account are created', async () => {
      const { sut } = makeSut()
      const httpRequest = {
        body: mockSignUpControllerRequest()
      }
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse).toEqual(ok(mockAuthenticationResult()))
    })
  })
})
