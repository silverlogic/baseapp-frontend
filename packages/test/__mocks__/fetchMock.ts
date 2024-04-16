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
