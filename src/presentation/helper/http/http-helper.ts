import { ServerError, UnauthorizedError } from '../../error'
import { HttpResponse } from '../../protocols'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error
})

export const unauthorized = (message?: string): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError(message)
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const okRequest = (data: any, control?: any): HttpResponse => ({
  statusCode: 200,
  body: data,
  control
})
