/* eslint-disable no-console */
import { AppDataSource } from '../../ormconfig'
import env from './config/env'
import * as http from 'http'

AppDataSource.initialize()
  .then(async () => {
    const app = (await import('./config/app')).default
    const serverHttp = http.createServer(app)
    serverHttp.listen(env.portHttp, () => {
      console.log(`Server running at http://localhost:${env.portHttp}`)
    })
  })
  .catch(console.error)
