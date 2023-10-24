import { Express, Router } from 'express'
import env from './env'
import path from 'path'
import fg from 'fast-glob'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger/swagger.json'

export default (app: Express): void => {
  const router = Router()

  // app.use((req, res, next) => {
  //   if (req.method === 'OPTIONS') {
  //     return res.sendStatus(200)
  //   }
  //   next()
  // })

  app.get('/status', (req, res) => {
    res.status(200).send({ message: 'API ON' })
  })

  app.use('/api', router)

  fg.sync(
    env.production
      ? '**/dist/src/main/routes/**/*routes.js'
      : '**/src/main/routes/**/*routes.ts'
  ).map(async (file: string) => {
    ;(await import(path.join(__dirname, '../../../', file))).default(router)
  })
}
