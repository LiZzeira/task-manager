import { DeleteCounts } from '../../../../domain/models/delete-count/delete-count'

export interface DeleteRangeRepository {
  deleteRange: (
    items: any[] | 'ALL',
    organizationId?: string,
    companyId?: string,
    relations?: Record<string, any>
  ) => Promise<DeleteCounts>
}
