export interface IDjangoPaginatedResponse<Result = any> {
  count: number
  next: string | null
  previous: string | null
  results: Result[]
}
