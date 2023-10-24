import {
  CompareFieldsValidation,
  EmailValidation
} from '../../../../presentation/helper/validator'
import { RequiredFieldValidation } from '../../../../presentation/helper/validator/riquired-field/riquered-field-validation'
import { ValidationComposite } from '../../../../presentation/helper/validator/validation-composite/validation-composite'
import { Validation } from '../../../../presentation/protocols'
import { EmailValidatorAdapter } from '../../../../utils/email-validatior/email-validator-adapter'

const requiredFields = ['email', 'name', 'password', 'passwordConfirmation']

export const makeAddAccountValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(
    new CompareFieldsValidation('password', 'passwordConfirmation')
  )

  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
