import { InvalidFieldError } from '@/validation/errors'
import { EmailValidation } from './email-validation'

describe('EmailValidation', () => {
  it('Should return error if email is invalid', () => {
    const sut = new EmailValidation('email')
    const error = sut.validate('invalid-email')
    expect(error).toEqual(new InvalidFieldError('email'))
  })
})
