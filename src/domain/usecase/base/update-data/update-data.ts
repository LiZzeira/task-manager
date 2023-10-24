export interface UpdateData<T> {
  update(object: T, userId?: string): Promise<T | null>
}
