import { InvalidFieldError } from '@/validation/errors'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class MinLengthValidation implements FieldValidation {
  constructor (readonly field: string, private readonly minLength: number) {}

  validate (input: Record<string, any>): Error | null {
    if (!input[this.field]) return null

    return input[this.field].length < this.minLength
      ? new InvalidFieldError(this.field)
      : null
  }
}
