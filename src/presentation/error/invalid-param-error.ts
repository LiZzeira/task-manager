export class InvalidParamError extends Error {
  constructor(paraName: string) {
    super(`Parâmetro inválido: ${paraName}`)
    this.name = 'InvalidParamError'
  }
}
