import { SignUpController } from './../../../src/presentation/controllers'
import { type AddEmployee, type AddCompany, type Authentication } from '../../domain/usecases'
import { mockAddEmployeeParams, throwError, mockAuthenticationResult, mockAddCompanyParams } from '../../domain/mocks'
import { type Validation } from '@/presentation/protocols'
import { ServerError, EmailInUseError, MissingParamError } from '../../../src/presentation/errors'
import { serverError, forbidden, ok, badRequest } from '../../../src/presentation/helpers/http-helper'
import { AddEmployeeSpy, AuthenticationStub, AddCompanySpy, mockSignUpControllerRequest, ValidationSpy } from '../mocks'

type SutTypes = {
  sut: SignUpController
  validationSpy: Validation
  addEmployeeSpy: AddEmployee
  authenticationSpy: Authentication
  addCompanySpy: AddCompany
}

const makeSut = (): SutTypes => {
  const validationSpy = ValidationSpy()
  const addEmployeeSpy = AddEmployeeSpy()
  const addCompanySpy = AddCompanySpy()
  const authenticationSpy = AuthenticationStub()
  const sut = new SignUpController(validationSpy, addEmployeeSpy, addCompanySpy, authenticationSpy)
  return {
    sut,
    validationSpy,
    addEmployeeSpy,
    addCompanySpy,
    authenticationSpy
  }
}

describe('SignUp Controller', () => {
  describe('Validation', () => {
    it('Should call Validation with correct value', async () => {
      const { sut, validationSpy } = makeSut()
      const validateSpy = jest.spyOn(validationSpy, 'validate')
      await sut.handle(mockSignUpControllerRequest())
      expect(validateSpy).toHaveBeenCalledWith(mockSignUpControllerRequest())
    })

    it('Should return 400 if Validation throws an error', async () => {
      const { sut, validationSpy } = makeSut()
      jest.spyOn(validationSpy, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
      const httpResponse = await sut.handle(mockSignUpControllerRequest())
      expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
    })
  })

  describe('AddEmployee', () => {
    it('Should call AddEmployee with correct values', async () => {
      const { sut, addEmployeeSpy } = makeSut()
      const addSpy = jest.spyOn(addEmployeeSpy, 'add')
      await sut.handle(mockSignUpControllerRequest())
      expect(addSpy).toHaveBeenCalledWith(mockAddEmployeeParams())
      expect(addSpy).toBeCalledTimes(1)
    })

    it('Should return 500 if AddEmployee throw', async () => {
      const { sut, addEmployeeSpy } = makeSut()
      jest.spyOn(addEmployeeSpy, 'add').mockImplementationOnce(throwError)
      const httpResponse = await sut.handle(mockSignUpControllerRequest())
      expect(httpResponse).toEqual(serverError(new ServerError(null)))
    })

    it('Should return 403 if AddEmployee return null', async () => {
      const { sut, addEmployeeSpy } = makeSut()
      jest.spyOn(addEmployeeSpy, 'add').mockReturnValueOnce(Promise.resolve(null))
      const httpResponse = await sut.handle(mockSignUpControllerRequest())
      expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
    })
  })

  describe('AddCompany', () => {
    it('Should call AddCompany with correct values', async () => {
      const { sut, addCompanySpy } = makeSut()
      const addSpy = jest.spyOn(addCompanySpy, 'add')
      await sut.handle(mockSignUpControllerRequest())
      expect(addSpy).toHaveBeenCalledWith(mockAddCompanyParams())
      expect(addSpy).toBeCalledTimes(1)
    })

    it('Should return 500 if AddCompany throw', async () => {
      const { sut, addCompanySpy } = makeSut()
      jest.spyOn(addCompanySpy, 'add').mockImplementationOnce(throwError)
      const httpResponse = await sut.handle(mockSignUpControllerRequest())
      expect(httpResponse).toEqual(serverError(new ServerError(null)))
    })

    it('Should return 403 if AddCompany return null', async () => {
      const { sut, addCompanySpy } = makeSut()
      jest.spyOn(addCompanySpy, 'add').mockReturnValueOnce(Promise.resolve(null))
      const httpResponse = await sut.handle(mockSignUpControllerRequest())
      expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
    })
  })

  describe('Authentication', () => {
    it('Should call Authentication with correct values', async () => {
      const { sut, authenticationSpy } = makeSut()
      const authSpy = jest.spyOn(authenticationSpy, 'auth')
      await sut.handle(mockSignUpControllerRequest())
      expect(authSpy).toHaveBeenCalledWith({
        email: mockSignUpControllerRequest().email,
        password: mockSignUpControllerRequest().password
      })
      expect(authSpy).toBeCalledTimes(1)
    })

    it('Should return 500 if Authentication throw', async () => {
      const { sut, authenticationSpy } = makeSut()
      jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
      const httpResponse = await sut.handle(mockSignUpControllerRequest())
      expect(httpResponse).toEqual(serverError(new ServerError(null)))
    })

    it('Should return 200 if account are created', async () => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockSignUpControllerRequest())
      expect(httpResponse).toEqual(ok(mockAuthenticationResult()))
    })
  })
})
