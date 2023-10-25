export interface RefreshToken {
  refresh: (id: string) => Promise<string>
}
