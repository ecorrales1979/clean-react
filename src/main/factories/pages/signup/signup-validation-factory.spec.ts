import { makeSignUpValidation } from './signup-validation-factory'
import {
  ValidationBuilder as Builder,
  ValidationComposite
} from '@/validation/validators'

describe('SignUpValidationFactory', () => {
  it('Should make ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        ...Builder.field('name').required().min(2).build(),
        ...Builder.field('email').required().email().build(),
        ...Builder.field('password').required().min(5).build(),
        ...Builder.field('passwordConfirmation')
          .required()
          .min(5)
          .sameAs('password')
          .build()
      ])
    )
  })
})
