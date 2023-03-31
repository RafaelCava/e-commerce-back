import { type Employee as EmployeeModel } from '../../../../domain/models'
import { MongoHelper } from '../helpers/mongo-helper'
import { Employee } from '../schemas'
import { type CheckEmployeeByEmailRepository, type AddEmployeeRepository, type LoadEmployeeByEmailRepository } from '../../../../data/protocols/db'
import mongoose from 'mongoose'
export class EmployeeMongoRepository implements AddEmployeeRepository, CheckEmployeeByEmailRepository, LoadEmployeeByEmailRepository {
  async add (employee: AddEmployeeRepository.Params): Promise<AddEmployeeRepository.Result> {
    const employeeCollection = MongoHelper.getModel<EmployeeModel>('Employee', Employee)
    employee = Object.assign({}, employee, { company: new mongoose.Types.ObjectId(employee.company) })
    return !!(await employeeCollection.create(employee))
  }

  async checkByEmail (email: string): Promise<CheckEmployeeByEmailRepository.Result> {
    const employeeCollection = MongoHelper.getModel<EmployeeModel>('Employee', Employee)
    const emailAlreadyInUse = await employeeCollection.findOne({ email }, { _id: 1 })
    return !!emailAlreadyInUse
  }

  async loadByEmail (email: string): Promise<LoadEmployeeByEmailRepository.Result> {
    const employeeCollection = MongoHelper.getModel<EmployeeModel>('Employee', Employee)
    const employee = await employeeCollection.findOne({ email }).lean()
    if (!employee) return null
    return await MongoHelper.map(employee)
  }
}
