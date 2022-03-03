import faker from '@faker-js/faker'

import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (
  fieldName = faker.database.column(),
  valueToCompare = faker.random.word()
): CompareFieldsValidation => {
  return new CompareFieldsValidation(fieldName, valueToCompare)
}

describe('CompareFieldsValidation', () => {
  it('should return error if compare is invalid', () => {
    const fieldName = faker.database.column()
    const sut = makeSut(fieldName, faker.random.word())
    const error = sut.validate(faker.random.word())

    expect(error).toEqual(new InvalidFieldError(fieldName))
  })

  it('Should return falsy if compare is valid', () => {
    const fieldName = faker.database.column()
    const value = faker.random.word()
    const sut = makeSut(fieldName, value)
    const error = sut.validate(value)
    expect(error).toBeFalsy()
  })

  it('Should return falsy if email is empty', () => {
    const sut = makeSut()
    const error = sut.validate('')
    expect(error).toBeFalsy()
  })
})
