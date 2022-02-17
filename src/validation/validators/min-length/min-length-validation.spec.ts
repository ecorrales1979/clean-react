import faker from '@faker-js/faker'

import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'
import { MinLengthValidation } from './min-length-validation'

const makeSut = (field: string, minLength: number = 5): FieldValidation => {
  return new MinLengthValidation(field, minLength)
}

describe('MinLengthValidation', () => {
  it('Should return error if value is invalid', () => {
    const fieldname = faker.database.column()
    const sut = makeSut(fieldname)
    const error = sut.validate(faker.random.alphaNumeric(3))
    expect(error).toEqual(new InvalidFieldError(fieldname))
  })

  it('Should return falsy if value is valid', () => {
    const sut = makeSut(faker.database.column())
    const error = sut.validate(faker.random.alphaNumeric(5))
    expect(error).toBeFalsy()
  })

  it('Should return falsy if value is empty', () => {
    const sut = makeSut(faker.database.column())
    const error = sut.validate('')
    expect(error).toBeFalsy()
  })
})
