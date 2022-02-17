import faker from '@faker-js/faker'

import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'

const makeSut = (field: string): EmailValidation => new EmailValidation(field)

describe('EmailValidation', () => {
  it('Should return error if email is invalid', () => {
    const sut = makeSut('email')
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError('email'))
  })

  it('Should return falsy if email is valid', () => {
    const sut = makeSut('email')
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
