const DevPostgres = {
  production: false,
  portHttp: process.env.PORT ?? 3001,
  jwtSecret: process.env.JWT_SECRET ?? 'JH!2=@ejal#@bk12',
  host: 'localhost',
  DB_HOST: 'localhost',
  DB_PORT: 5432,
  DB_DATABASE: 'task',
  DB_USER: 'postgres',
  DB_PASSWORD: '123456',
  DB_URL: 'postgres://postgres:password@db:5432/lbdatabase',
  salt: 12
}

const DevDocker = {
  production: false,
  docker: true,
  portHttp: process.env.PORT ?? 3001,
  jwtSecret: process.env.JWT_SECRET ?? 'JH!2=@ejal#@bk12',
  host: 'localhost',
  DB_HOST: '',
  DB_PORT: 5432,
  DB_DATABASE: 'lbdatabase',
  DB_USER: 'postgres',
  DB_PASSWORD: 'password',
  DB_URL: 'postgres://postgres:password@db:5432/lbdatabase',
  salt: 12
}

export default DevDocker
