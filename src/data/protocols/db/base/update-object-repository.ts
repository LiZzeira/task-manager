export interface UpdateObjectRepository {
  update: (
    object: any,
    organizationId?: string,
    companyId?: string
  ) => Promise<any>
}
