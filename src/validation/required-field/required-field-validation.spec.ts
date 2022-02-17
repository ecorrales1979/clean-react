import faker from '@faker-js/faker'

import { RequiredFieldError } from '@/validation/errors'
import { RequiredFieldValidation } from './required-field-validation'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('email')
}

describe('RequiredFieldValidation', () => {
  it('should return error if field is empty', () => {
    const sut = makeSut()
    const error = sut.validate('')

    expect(error).toEqual(new RequiredFieldError())
  })

  it('should return falsy if field is not empty', () => {
    const sut = makeSut()
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
