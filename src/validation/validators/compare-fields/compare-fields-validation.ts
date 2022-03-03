import { FieldValidation } from '@/validation/protocols/field-validation'
import { InvalidFieldError } from '@/validation/errors'

export class CompareFieldsValidation implements FieldValidation {
  constructor (
    readonly field: string,
    private readonly valueToCOmpare: string
  ) {}

  validate (value: string): Error | null {
    return new InvalidFieldError(this.field)
  }
}
