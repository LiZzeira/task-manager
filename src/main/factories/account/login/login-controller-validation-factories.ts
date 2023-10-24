import { ValidationComposite } from '../../../../presentation/helper/validator'
import { RequiredFieldValidation } from '../../../../presentation/helper/validator/riquired-field/riquered-field-validation'
import { Validation } from '../../../../presentation/protocols'

const requiredFields = ['email', 'password']

export const makeAuthenticationAccountValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
