const Development = {
  production: false,
  portHttps: process.env.PORT ?? 443,
  portHttp: process.env.PORT ?? 3001,
  jwtSecret: process.env.JWT_SECRET ?? 'JH!2=@ejal#@bk12',
  host: 'localhost',
  DB_HOST: 'localhost',
  DB_PORT: 5432,
  DB_DATABASE: 'task',
  DB_USER: 'postgres',
  DB_PASSWORD: '123456',
  salt: 12
}

export default Development
