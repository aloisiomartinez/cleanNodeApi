import { MissingParamError } from '../../errors'
import { RequiredFieldValidation } from './require-field-validation'

describe('RequiredField Validation', () => {
  test('should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({
      name: 'any_name'
    })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('should not return if validation succeeds', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({
      field: 'any_name'
    })
    expect(error).toBeFalsy()
  })
})
