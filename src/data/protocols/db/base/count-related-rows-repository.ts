import { IdObject } from './list-object-by-id-repository'

export interface CountRelatedRowsRepository {
  countRelatedRows: (
    id: IdObject,
    organizationId?: string,
    companyId?: string
  ) => Promise<number>
}
