import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLength: number) {}
  validate (value: string): Error | null {
    if (!value) return null

    return value.length < this.minLength
      ? new InvalidFieldError(this.field)
      : null
  }
}
