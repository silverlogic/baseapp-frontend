type MockFetchOptions = {
  ok?: Response['ok']
  status?: Response['status']
  method?: RequestInit['method']
  response?: Record<string, any>
}

export type MockFetch = (url: string, options?: MockFetchOptions) => void
