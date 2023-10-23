import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'

import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger/swagger.json'

const app = express()
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
setupMiddlewares(app)
setupRoutes(app)
export default app
