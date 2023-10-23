import 'reflect-metadata'
import { DataSource } from 'typeorm'
import env from './src/main/config/env'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  logging: false,
  synchronize: false,
  subscribers: [
    __dirname +
      `${
        env.production ? '/../dist/src' : '/src'
      }/**/subscribers/**/*-subscriber.${!env.production ? 'ts' : 'js'}`
  ],
  name: 'default',
  migrationsRun: true,
  entities: [
    __dirname +
      `${env.production ? '/../dist/src' : '/src'}/**/entities/**/*-entity.${
        !env.production ? 'ts' : 'js'
      }`
  ],
  migrations: [
    __dirname +
      `${env.production ? '/../dist/src' : '/src'}/**/migrations/*migration.${
        !env.production ? 'ts' : 'js'
      }`
  ]
})
