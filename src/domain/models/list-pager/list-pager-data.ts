export interface PagerData {
  page: number
  limit: number | 'no limit'
  length: number
  data: any[]
}
