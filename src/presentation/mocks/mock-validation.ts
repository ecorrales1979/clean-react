import { Validation } from '@/presentation/protocols/validation'

export class ValidationSpy implements Validation {
  errorMessage!: string
  fieldname!: string
  fieldvalue!: string

  validate (fieldname: string, fieldvalue: string): string {
    this.fieldname = fieldname
    this.fieldvalue = fieldvalue
    return this.errorMessage
  }
}
