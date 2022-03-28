import faker from '@faker-js/faker'

import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (
  field: string,
  fieldToCompare: string
): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, fieldToCompare)
}

describe('CompareFieldsValidation', () => {
  it('should return error if compare is invalid', () => {
    const field = 'field1'
    const fieldToCompare = 'field2'
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: 'any_value',
      [fieldToCompare]: 'other_value'
    })
    expect(error).toEqual(new InvalidFieldError(field))
  })

  it('Should return falsy if compare is valid', () => {
    const field = 'field1'
    const fieldToCompare = 'field2'
    const value = faker.random.word()
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })
    expect(error).toBeFalsy()
  })

  it('Should return falsy if field is empty', () => {
    const field = 'field1'
    const fieldToCompare = 'field2'
    const sut = makeSut(field, fieldToCompare)
    const error = sut.validate({
      [field]: '',
      [fieldToCompare]: faker.random.word()
    })
    expect(error).toBeFalsy()
  })
})
