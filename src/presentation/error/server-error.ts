export class ServerError extends Error {
  constructor(stack: string | undefined) {
    super('Erro do Servidor Interno')
    this.name = 'ServerError'
    this.stack = stack
  }
}
