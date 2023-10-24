export interface FindOneObjectRepository {
  findById: (id: string, userId?: string, relations?: any) => Promise<any>
}
