import { DateTime } from 'luxon'

const timeZone = 'America/Sao_Paulo'
DateTime.local().setZone(timeZone)

export const createDate = (...args: any[]): Date => {
  if (args.length === 0) {
    const date = DateTime.now()
    const { year, month, day, hour, minute, second } = date.c
    return new Date(Date.UTC(year, month - 1, day, hour, minute, second))
  } else {
    const date = DateTime.fromJSDate(
      new (Date.bind.apply(Date, [null, ...args]))()
    )
    const { year, month, day, hour, minute, second } = date.c
    return new Date(Date.UTC(year, month - 1, day, hour, minute, second))
  }
}
