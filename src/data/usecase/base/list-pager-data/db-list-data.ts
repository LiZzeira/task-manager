import {
  FilterColumns,
  ListPagerData
} from '../../../../domain/usecase/base/list-pager/list-pager-data'
import { ListPagerDataRepository } from '../../../protocols/db/base/list-object-repository'

export class DbListPagerData implements ListPagerData<any> {
  constructor(private readonly listPagerRepository: ListPagerDataRepository) {}
  async list(
    search?: string,
    page?: number,
    limit?: number | 'all',
    orderBy?: string,
    desc?: boolean,
    filterColumns?: FilterColumns,
    fields?: any[],
    relations?: any,
    select?: any
  ): Promise<any> {
    return await this.listPagerRepository.list(
      search,
      page,
      limit,
      orderBy,
      desc,
      filterColumns,
      fields,
      relations,
      select
    )
  }
}
