export interface UpdateObjectRepository {
  update: (object: any, userId?: string) => Promise<any>
}
