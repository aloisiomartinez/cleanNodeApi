import { Controller, HttpRequest, HttpResponse, EmailValidator, Authentication } from './signup-protocols'
import { badRequest, serverError, unauthorized } from './../../helpers/http-helper'
import { InvalidParamError } from './../../errors/invalid-param-error'
import { MissingParamError } from './../../errors/missing-param-error'

export class LoginController implements Controller {
  private readonly emailValidor: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidor = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password } = httpRequest.body

      const isValid = this.emailValidor.isValid(email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const accessToken = await this.authentication.auth(email, password)

      if (!accessToken) {
        return unauthorized()
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
