import { PagerData } from '../../../models/list-pager/list-pager-data'

export type FilterColumns = Record<string, string | number | any[]>

export interface ListPagerData {
  list: (
    search?: string,
    page?: number,
    limit?: number | 'all',
    orderBy?: string,
    desc?: boolean,
    filterColumns?: FilterColumns,
    fields?: any[],
    relations?: any,
    select?: any
  ) => Promise<PagerData>
}
