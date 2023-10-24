export interface FindOneData<T> {
  findOne(id: string, userId: string): Promise<T | null>
}
