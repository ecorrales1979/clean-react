import {
  ValidationBuilder as Builder,
  ValidationComposite
} from '@/validation/validators'

export const makeLoginValidation = (): ValidationComposite => {
  return ValidationComposite.build([
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').required().min(5).build()
  ])
}
