import { MissingParamError } from './../../errors/missing-param-error'
import { badRequest } from './../../helpers/http-helper'
import { HttpRequest, HttpResponse, Controller } from '../../protocols'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return await new Promise(resolve => badRequest(new MissingParamError('email')))
  }
}
