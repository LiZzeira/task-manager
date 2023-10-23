export class NotFoundError extends Error {
  constructor(paraName: string) {
    super(`${paraName} não encontrado`)
    this.name = 'NotFoundError'
  }
}
