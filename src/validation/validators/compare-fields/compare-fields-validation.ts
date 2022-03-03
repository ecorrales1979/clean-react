import { FieldValidation } from '@/validation/protocols/field-validation'
import { InvalidFieldError } from '@/validation/errors'

export class CompareFieldsValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly valueToCompare: string
  ) {}

  validate (value: string): Error | null {
    if (!value) return null

    return value !== this.valueToCompare
      ? new InvalidFieldError(this.field)
      : null
  }
}
