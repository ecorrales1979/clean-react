import faker from '@faker-js/faker'

import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'
import { MinLengthValidation } from './min-length-validation'

const makeSut = (field: string, minLength = 5): FieldValidation => {
  return new MinLengthValidation(field, minLength)
}

describe('MinLengthValidation', () => {
  it('Should return error if value is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(3) })
    expect(error).toEqual(new InvalidFieldError(field))
  })

  it('Should return falsy if value is valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })

  it('Should return falsy if value is empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: '' })
    expect(error).toBeFalsy()
  })

  it('Should return falsy if field does not exist in schema', () => {
    const sut = makeSut('validField')
    const error = sut.validate({ invaliField: faker.random.alphaNumeric(5) })
    expect(error).toBeFalsy()
  })
})
