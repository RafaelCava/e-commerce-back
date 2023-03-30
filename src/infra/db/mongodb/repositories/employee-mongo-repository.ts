import { type Employee as EmployeeModel } from '../../../../domain/models'
import { MongoHelper } from '../helpers/mongo-helper'
import { Employee } from '../schemas'
import { type CheckEmployeeByEmailRepository, type AddEmployeeRepository } from '../../../../data/protocols/db'
import mongoose from 'mongoose'
export class EmployeeMongoRepository implements AddEmployeeRepository, CheckEmployeeByEmailRepository {
  async add (employee: AddEmployeeRepository.Params): Promise<AddEmployeeRepository.Result> {
    const employeeCollection = MongoHelper.getModel<EmployeeModel>('Employee', Employee)
    employee = Object.assign({}, employee, { company: new mongoose.Types.ObjectId(employee.company) })
    return !!(await employeeCollection.create(employee))
  }

  async checkByEmail (email: string): Promise<CheckEmployeeByEmailRepository.Result> {
    return await Promise.resolve(true)
  }
}
