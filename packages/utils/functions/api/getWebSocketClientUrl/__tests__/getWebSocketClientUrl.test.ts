import { getWebSocketClientUrl } from '..'

describe('getWebSocketClientUrl', () => {
  let originalWindow: typeof globalThis.window

  beforeEach(() => {
    originalWindow = global.window
  })

  afterEach(() => {
    global.window = originalWindow
  })

  it.each(['wss://api.example.com/graphql', 'ws://192.168.3.4:8000/graphql'])(
    'passes the absolute endpoint %s as the same string',
    (endpoint) => {
      expect(getWebSocketClientUrl(endpoint)).toBe(endpoint)
    },
  )

  it('passes an absolute endpoint without touching the page address', () => {
    // React Native has a `window` but no `location`.
    Object.defineProperty(global, 'window', { value: {}, writable: true, configurable: true })

    expect(getWebSocketClientUrl('wss://api.example.com/graphql')).toBe(
      'wss://api.example.com/graphql',
    )
  })

  it('turns a relative endpoint into a function resolved at each connection attempt', () => {
    Object.defineProperty(global, 'window', {
      value: { location: { protocol: 'https:', host: 'first.example.com' } },
      writable: true,
      configurable: true,
    })

    const url = getWebSocketClientUrl('/graphql')

    expect(typeof url).toBe('function')
    expect((url as () => string)()).toBe('wss://first.example.com/graphql')

    window.location.host = 'second.example.com'
    expect((url as () => string)()).toBe('wss://second.example.com/graphql')
  })

  it('does not resolve a relative endpoint when the client is created on the server', () => {
    delete (global as any).window

    const url = getWebSocketClientUrl('/graphql')

    expect(typeof url).toBe('function')
    expect(url as () => string).toThrow('only a browser can resolve')
  })
})
