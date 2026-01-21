// Set a default API base URL for tests if not already set
if (typeof process.env.NEXT_PUBLIC_API_BASE_URL === 'undefined') {
  process.env.NEXT_PUBLIC_API_BASE_URL = ''
}

class MockResponse {
  ok: boolean
  status: number
  body: any
  headers: Map<string, string>

  constructor(
    body: any,
    init?: { ok?: boolean; status?: number; headers?: Record<string, string> },
  ) {
    this.ok = init?.ok ?? true
    this.status = init?.status ?? 200
    this.body = body
    this.headers = new Map(Object.entries(init?.headers || {}))
  }

  async json() {
    return Promise.resolve(this.body)
  }

  async text() {
    return Promise.resolve(JSON.stringify(this.body))
  }
}

global.Response = MockResponse as any
