import { FieldValidation } from '@/validation/protocols/field-validation'
import { InvalidFieldError } from '@/validation/errors'

export class CompareFieldsValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly fieldToCompare: string
  ) {}

  validate (input: Record<string, any>): Error | null {
    if (!input[this.field]) return null

    return input[this.field] !== input[this.fieldToCompare]
      ? new InvalidFieldError(this.field)
      : null
  }
}
