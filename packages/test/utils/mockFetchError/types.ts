type MockFetchOptions = {
  status?: Response['status']
  method?: RequestInit['method']
  error?: string
}

export type MockFetchError = (url: string, options?: MockFetchOptions) => void
