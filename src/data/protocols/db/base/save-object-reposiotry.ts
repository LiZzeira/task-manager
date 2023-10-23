export interface SaveObjectRepository {
  save: (data: any) => Promise<any>
}
