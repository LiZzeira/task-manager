export class MissingParamError extends Error {
  constructor(paraName: string) {
    super(`Parâmetro ausente: ${paraName}`)
    this.name = 'MissingParamError'
  }
}
