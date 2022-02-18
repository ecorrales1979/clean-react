import { FieldValidationSpy } from '@/validation/mocks/mock-field-validation'
import { ValidationComposite } from './validation-composite'

interface SutType {
  sut: ValidationComposite
  fieldValidationSpies: FieldValidationSpy[]
}

const makeSut = (): SutType => {
  const fieldValidationSpies = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field')
  ]
  const sut = new ValidationComposite(fieldValidationSpies)

  return { sut, fieldValidationSpies: fieldValidationSpies }
}

describe('ValidationComposite', () => {
  it('Should return error if any validation fails', () => {
    const { sut, fieldValidationSpies } = makeSut()
    fieldValidationSpies[1].error = new Error('any_message')
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('any_message')
  })

  it('Should return first error found if some validations fail', () => {
    const { sut, fieldValidationSpies } = makeSut()
    fieldValidationSpies[0].error = new Error('first_error_message')
    fieldValidationSpies[1].error = new Error('second_error_message')
    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('first_error_message')
  })
})
