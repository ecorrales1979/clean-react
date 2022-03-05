import faker from '@faker-js/faker'

import { FieldValidationSpy } from '@/validation/mocks'
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
    const field = faker.database.column()
    const { sut, fieldValidationSpies } = makeSut(field)
    const errorMessage = faker.random.words()
    fieldValidationSpies[1].error = new Error(errorMessage)
    const error = sut.validate(field, { [field]: faker.random.word() })
    expect(error).toBe(errorMessage)
  })

  it('Should return first error found if some validations fail', () => {
    const field = faker.database.column()
    const { sut, fieldValidationSpies } = makeSut(field)
    const firstErrorMessage = faker.random.words()
    fieldValidationSpies[0].error = new Error(firstErrorMessage)
    const secondErrorMessage = faker.random.words()
    fieldValidationSpies[1].error = new Error(secondErrorMessage)
    const error = sut.validate(field, { [field]: faker.random.word() })
    expect(error).toBe(firstErrorMessage)
  })

  it('Should return falsy if validation succeeds', () => {
    const field = faker.database.column()
    const { sut } = makeSut(field)
    const error = sut.validate(field, { [field]: faker.random.word() })
    expect(error).toBeFalsy()
  })
})
