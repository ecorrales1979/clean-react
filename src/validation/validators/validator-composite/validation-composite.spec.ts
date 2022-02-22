import faker from '@faker-js/faker'

import { FieldValidationSpy } from '@/validation/mocks/mock-field-validation'
import { ValidationComposite } from './validation-composite'

interface SutType {
  sut: ValidationComposite
  fieldValidationSpies: FieldValidationSpy[]
}

const makeSut = (field: string): SutType => {
  const fieldValidationSpies = [
    new FieldValidationSpy(field),
    new FieldValidationSpy(field)
  ]
  const sut = ValidationComposite.build(fieldValidationSpies)

  return { sut, fieldValidationSpies: fieldValidationSpies }
}

describe('ValidationComposite', () => {
  it('Should return error if any validation fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationSpies } = makeSut(fieldName)
    const errorMessage = faker.random.words()
    fieldValidationSpies[1].error = new Error(errorMessage)
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBe(errorMessage)
  })

  it('Should return first error found if some validations fail', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidationSpies } = makeSut(fieldName)
    const firstErrorMessage = faker.random.words()
    fieldValidationSpies[0].error = new Error(firstErrorMessage)
    const secondErrorMessage = faker.random.words()
    fieldValidationSpies[1].error = new Error(secondErrorMessage)
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBe(firstErrorMessage)
  })

  it('Should return falsy if validation succeeds', () => {
    const fieldName = faker.database.column()
    const { sut } = makeSut(fieldName)
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBeFalsy()
  })
})
