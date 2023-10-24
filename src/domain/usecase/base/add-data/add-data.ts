export interface AddData<T, Result> {
  add: (object: T) => Promise<Result>
}
