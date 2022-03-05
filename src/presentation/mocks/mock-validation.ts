import { Validation } from '@/presentation/protocols/validation'

export class ValidationSpy implements Validation {
  errorMessage!: string
  fieldname!: string
  fieldvalue!: string

  validate (fieldname: string, input: Record<string, any>): string {
    this.fieldname = fieldname
    this.fieldvalue = input[fieldname]
    return this.errorMessage
  }
}
