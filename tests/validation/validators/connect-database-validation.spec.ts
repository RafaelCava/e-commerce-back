import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { ServerError } from '@/presentation/errors'
import { ConnectDatabaseValidation } from '@/validation/validators'

describe('ConnectDatabaseValidation', () => {
  test('Should return an error if database is not connected', () => {
    const sut = new ConnectDatabaseValidation()
    const error = sut.validate({})
    expect(error).toEqual(new ServerError('Database not connected'))
  })

  test('Should not return if database is connected', () => {
    const sut = new ConnectDatabaseValidation()
    jest.spyOn(MongoHelper, 'isConnected').mockReturnValueOnce(true)
    const error = sut.validate({})
    expect(error).toBeFalsy()
  })
})
