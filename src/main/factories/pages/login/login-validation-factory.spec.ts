import { makeLoginValidation } from './login-validation-factory'
import {
  ValidationBuilder as Builder,
  ValidationComposite
} from '@/validation/validators'

describe('LoginValidationFactory', () => {
  it('Should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        ...Builder.field('email').required().email().build(),
        ...Builder.field('password').required().min(5).build()
      ])
    )
  })
})
