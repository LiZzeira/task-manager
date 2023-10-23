export interface FindOneObjectRepository {
  findById: (
    id: string,
    organizationId?: string,
    companyId?: string,
    relations?: any
  ) => Promise<any>
}
