import faker from '@faker-js/faker'

import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (
  fieldName = faker.database.column(),
  valueToCompare: string
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
})
