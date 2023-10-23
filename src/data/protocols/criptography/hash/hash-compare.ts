export interface HashCompare {
  compare: (value: string, hashed: string) => Promise<boolean>
}
