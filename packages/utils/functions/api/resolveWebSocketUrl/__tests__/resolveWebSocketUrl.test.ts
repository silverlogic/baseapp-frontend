import { resolveWebSocketUrl } from '..'

describe('resolveWebSocketUrl', () => {
  let originalWindow: typeof globalThis.window

  beforeEach(() => {
    originalWindow = global.window
  })

  afterEach(() => {
    global.window = originalWindow
  })

  const setPageAddress = (protocol: string, host: string) => {
    Object.defineProperty(global, 'window', {
      value: { location: { protocol, host } },
      writable: true,
      configurable: true,
    })
  }

  it('returns an absolute address unchanged', () => {
    setPageAddress('https:', 'tenant.example.com')

    expect(resolveWebSocketUrl('wss://api.example.com/graphql')).toBe(
      'wss://api.example.com/graphql',
    )
  })

  it('resolves a relative address against a secure page', () => {
    setPageAddress('https:', 'tenant.example.com')

    expect(resolveWebSocketUrl('/graphql')).toBe('wss://tenant.example.com/graphql')
  })

  it('resolves a relative address against a plain page, keeping its port', () => {
    setPageAddress('http:', 'tenant.localhost:8080')

    expect(resolveWebSocketUrl('/graphql')).toBe('ws://tenant.localhost:8080/graphql')
  })

  it('refuses a relative address outside the browser', () => {
    delete (global as any).window

    expect(() => resolveWebSocketUrl('/graphql')).toThrow(
      "The websocket address '/graphql' is relative, which only a browser can resolve.",
    )
  })
})
