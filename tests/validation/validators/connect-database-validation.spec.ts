import { ServerError } from '@/presentation/errors'
import { ConnectDatabaseValidation } from '@/validation/validators'

describe('ConnectDatabaseValidation', () => {
  test('Should return an error if database is not connected', () => {
    const sut = new ConnectDatabaseValidation(() => false)
    const error = sut.validate({})
    expect(error).toEqual(new ServerError('Database not connected'))
  })

  test('Should not return if database is connected', () => {
    const sut = new ConnectDatabaseValidation(() => true)
    const error = sut.validate({})
    expect(error).toBeFalsy()
  })
})
