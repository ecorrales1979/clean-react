export class InvalidFieldError extends Error {
  constructor (fieldname: string) {
    super(`${fieldname} is invalid`)
    this.name = 'InvalidFieldError'
  }
}
