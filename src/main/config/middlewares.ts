import { Express } from 'express'
import { bodyParser, contentType, corsCustom } from '../middlewares'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(corsCustom)
  app.use(contentType)
}
