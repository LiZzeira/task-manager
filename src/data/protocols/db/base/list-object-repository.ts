import { PagerData } from '../../../../domain/models/list-pager/list-pager-data'
import { FilterColumns } from '../../../../domain/usecase/base/list-pager/list-pager-data'

export interface ListPagerDataRepository {
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
