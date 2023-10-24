import { Request, Response } from 'express'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '../../presentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const token = req.get('Authorization')

    if (token && token !== '') {
      req.body.accessToken = token.startsWith('Bearer ')
        ? token.split(' ')[1]
        : token
    }

    const id = req.params.id
    if (id && id !== '' && id !== 'null' && id !== 'undefined') {
      req.body.id = `${id}`
    }
    const tokenInvite = req.params.token
    if (
      tokenInvite &&
      tokenInvite !== '' &&
      tokenInvite !== 'null' &&
      tokenInvite !== 'undefined'
    ) {
      req.body.tokenInvite = `${tokenInvite}`
    }
    const page = req.query.page
    if (page && page !== '0' && page !== 'null' && page !== 'undefined') {
      req.body.page = Number(page)
    }

    const httpRequest: HttpRequest = {
      body: req.body,
      control: {}
    }

    const httpResponse: HttpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res
        .status(httpResponse.statusCode)
        .json({ error: httpResponse.body.message })
    }
  }
}

export const adaptRouteListPager = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const token = req.get('Authorization')
    if (token && token !== '') {
      req.body.accessToken = token.startsWith('Bearer ')
        ? token.split(' ')[1]
        : token
    }

    const page = req.query.page
    if (page && page !== '0' && page !== 'null' && page !== 'undefined') {
      req.body.page = Number(page)
    }
    const search = req.query.search
    if (search && search !== 'undefined' && search !== 'null') {
      req.body.search = search
    }
    const limit = req.query.limit
    if (limit && limit !== '0' && limit !== 'null' && limit !== 'undefined') {
      req.body.limit = Number(limit)
    }
    const orderBy = req.query.orderBy
    if (orderBy && orderBy !== 'undefined' && orderBy !== 'null') {
      req.body.orderBy = orderBy
    }
    const desc = req.query.desc
    if (desc) {
      req.body.desc = desc === 'true'
    }
    const filterColumns = req.query.filterColumns

    if (filterColumns) {
      try {
        const parsedFilterColumns = JSON.parse(filterColumns as string)
        req.body.filterColumns = parsedFilterColumns
      } catch (error) {
        req.body.filterColumns = {}
      }
    }

    delete req.query.filterColumns
    delete req.query.page
    delete req.query.search
    delete req.query.limit
    delete req.query.orderBy
    delete req.query.desc

    const id = req.params?.id

    const httpRequest: HttpRequest = {
      body: { ...req.body, ...(id && { id }) },
      control: {
        reqOptions: {
          url: req.originalUrl,
          method: req.method,
          origin: req.headers.origin,
          ip: req.ip,
          device: req.get('Sec-Ch-Ua-Platform')
        }
      }
    }

    const httpResponse: HttpResponse = await controller.handle(httpRequest)
    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res
        .status(httpResponse.statusCode)
        .json({ error: httpResponse.body.message })
    }
  }
}
