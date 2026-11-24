import { headers } from 'next/headers'
import type { Mock } from 'vitest'

import { resolveApiUrl } from '..'

vi.mock('next/headers', async () => ({
  headers: vi.fn(),
}))

const mockIncomingHeaders = (values: Record<string, string>) => {
  ;(headers as Mock).mockResolvedValue(new Headers(values))
}

describe('resolveApiUrl', () => {
  let originalWindow: typeof globalThis.window

  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubEnv('INTERNAL_API_ORIGIN', 'http://web:8000')
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  describe.each([
    ['in the browser', () => {}],
    [
      'on the server',
      () => {
        delete (global as any).window
      },
    ],
    [
      'in React Native (a window without location)',
      () => {
        Object.defineProperty(global, 'window', { value: {}, writable: true, configurable: true })
      },
    ],
  ])('%s', (_, setUp) => {
    beforeEach(() => {
      originalWindow = global.window
      setUp()
    })

    afterEach(() => {
      global.window = originalWindow
    })

    it.each([
      'https://api.example.com/v1',
      'http://localhost:8000/graphql',
      'http://192.168.3.4:8000/v1',
      '//api.example.com/v1',
      '',
      undefined,
    ])('returns %s unchanged, with no headers, without reading the request', async (baseUrl) => {
      await expect(resolveApiUrl(baseUrl)).resolves.toEqual({ url: baseUrl, headers: {} })
      expect(headers).not.toHaveBeenCalled()
    })
  })

  describe('a relative address in the browser', () => {
    it('is returned unchanged, so it resolves against the page address', async () => {
      await expect(resolveApiUrl('/v1')).resolves.toEqual({ url: '/v1', headers: {} })
      expect(headers).not.toHaveBeenCalled()
    })
  })

  describe('a relative address on the server', () => {
    beforeEach(() => {
      originalWindow = global.window
      delete (global as any).window
    })

    afterEach(() => {
      global.window = originalWindow
    })

    it('calls the internal origin and forwards the forwarded host', async () => {
      mockIncomingHeaders({ host: 'web-frontend:3000', 'x-forwarded-host': 'tenant.example.com' })

      await expect(resolveApiUrl('/v1')).resolves.toEqual({
        url: 'http://web:8000/v1',
        headers: { 'X-Forwarded-Host': 'tenant.example.com' },
      })
    })

    it('forwards the Host header when the request has no forwarded host', async () => {
      mockIncomingHeaders({ host: 'tenant.localhost:8080' })

      const { headers: forwarded } = await resolveApiUrl('/graphql')

      expect(forwarded).toEqual({ 'X-Forwarded-Host': 'tenant.localhost:8080' })
    })

    it('forwards the first host of a proxy chain', async () => {
      mockIncomingHeaders({ 'x-forwarded-host': 'tenant.example.com, proxy.internal' })

      const { headers: forwarded } = await resolveApiUrl('/v1')

      expect(forwarded['X-Forwarded-Host']).toBe('tenant.example.com')
    })

    it('copies the forwarded scheme headers the request has, but not X-Forwarded-For by default', async () => {
      mockIncomingHeaders({
        'x-forwarded-host': 'tenant.example.com',
        'x-forwarded-proto': 'https',
        'x-forwarded-protocol': 'https',
        'x-forwarded-for': '203.0.113.7',
      })

      const { headers: forwarded } = await resolveApiUrl('/v1')

      expect(forwarded).toEqual({
        'X-Forwarded-Host': 'tenant.example.com',
        'X-Forwarded-Proto': 'https',
        'X-Forwarded-Protocol': 'https',
      })
    })

    it('ignores a trailing slash on the internal origin', async () => {
      vi.stubEnv('INTERNAL_API_ORIGIN', 'http://web:8000/')
      mockIncomingHeaders({ host: 'tenant.example.com' })

      const { url } = await resolveApiUrl('/v1')

      expect(url).toBe('http://web:8000/v1')
    })

    it('uses the given host instead of reading the request', async () => {
      await expect(resolveApiUrl('/v1', { host: 'other.example.com' })).resolves.toEqual({
        url: 'http://web:8000/v1',
        headers: { 'X-Forwarded-Host': 'other.example.com' },
      })
      expect(headers).not.toHaveBeenCalled()
    })

    it('refuses without INTERNAL_API_ORIGIN', async () => {
      vi.stubEnv('INTERNAL_API_ORIGIN', '')
      mockIncomingHeaders({ host: 'tenant.example.com' })

      await expect(resolveApiUrl('/v1')).rejects.toThrow(
        "The API address '/v1' is relative, so server-side calls need INTERNAL_API_ORIGIN",
      )
    })

    it('refuses when the request has no host', async () => {
      mockIncomingHeaders({})

      await expect(resolveApiUrl('/v1')).rejects.toThrow(
        'The incoming request has no host to forward to the API.',
      )
    })

    it('reads the given incoming headers instead of next/headers', async () => {
      const incoming = new Headers({
        host: 'web-frontend:3000',
        'x-forwarded-host': 'tenant.example.com',
        'x-forwarded-proto': 'https',
      })

      await expect(resolveApiUrl('/v1', { incomingHeaders: incoming })).resolves.toEqual({
        url: 'http://web:8000/v1',
        headers: { 'X-Forwarded-Host': 'tenant.example.com', 'X-Forwarded-Proto': 'https' },
      })
      expect(headers).not.toHaveBeenCalled()
    })

    it('prefers the given host over the incoming headers', async () => {
      const incoming = new Headers({ host: 'tenant.example.com', 'x-forwarded-proto': 'https' })

      const { headers: forwarded } = await resolveApiUrl('/v1', {
        host: 'other.example.com',
        incomingHeaders: incoming,
      })

      expect(forwarded).toEqual({
        'X-Forwarded-Host': 'other.example.com',
        'X-Forwarded-Proto': 'https',
      })
    })

    describe('with INTERNAL_API_FORWARDED_FOR_TRIM', () => {
      const chain = '198.51.100.4, 203.0.113.7, 172.18.0.5'

      it.each([
        ['1', '198.51.100.4, 203.0.113.7'],
        ['2', '198.51.100.4'],
        ['0', chain],
        [' 1 ', '198.51.100.4, 203.0.113.7'],
      ])('set to %s forwards the visitor chain without its last entries', async (trim, sent) => {
        vi.stubEnv('INTERNAL_API_FORWARDED_FOR_TRIM', trim)
        mockIncomingHeaders({ host: 'tenant.example.com', 'x-forwarded-for': chain })

        const { headers: forwarded } = await resolveApiUrl('/v1')

        expect(forwarded).toEqual({
          'X-Forwarded-Host': 'tenant.example.com',
          'X-Forwarded-For': sent,
        })
      })

      it('normalises the spacing of the forwarded chain', async () => {
        vi.stubEnv('INTERNAL_API_FORWARDED_FOR_TRIM', '1')
        mockIncomingHeaders({
          host: 'tenant.example.com',
          'x-forwarded-for': '198.51.100.4,203.0.113.7 , 172.18.0.5',
        })

        const { headers: forwarded } = await resolveApiUrl('/v1')

        expect(forwarded['X-Forwarded-For']).toBe('198.51.100.4, 203.0.113.7')
      })

      it.each([
        ['has only the entries it trims', { 'x-forwarded-for': '172.18.0.5' }],
        ['has no X-Forwarded-For', {}],
        ['has an empty X-Forwarded-For', { 'x-forwarded-for': ' , ' }],
      ])('sends no X-Forwarded-For when the request %s', async (_, values) => {
        vi.stubEnv('INTERNAL_API_FORWARDED_FOR_TRIM', '1')
        mockIncomingHeaders({ host: 'tenant.example.com', ...values })

        const { headers: forwarded } = await resolveApiUrl('/v1')

        expect(forwarded).toEqual({ 'X-Forwarded-Host': 'tenant.example.com' })
      })

      it('reads the chain from the given incoming headers', async () => {
        vi.stubEnv('INTERNAL_API_FORWARDED_FOR_TRIM', '1')
        const incoming = new Headers({ host: 'tenant.example.com', 'x-forwarded-for': chain })

        const { headers: forwarded } = await resolveApiUrl('/v1', { incomingHeaders: incoming })

        expect(forwarded['X-Forwarded-For']).toBe('198.51.100.4, 203.0.113.7')
        expect(headers).not.toHaveBeenCalled()
      })

      it('does not read the request when only a host is given', async () => {
        vi.stubEnv('INTERNAL_API_FORWARDED_FOR_TRIM', '1')

        const { headers: forwarded } = await resolveApiUrl('/v1', { host: 'other.example.com' })

        expect(forwarded).toEqual({ 'X-Forwarded-Host': 'other.example.com' })
        expect(headers).not.toHaveBeenCalled()
      })

      it.each(['-1', '1.5', 'yes'])('refuses an invalid value (%s)', async (trim) => {
        vi.stubEnv('INTERNAL_API_FORWARDED_FOR_TRIM', trim)
        mockIncomingHeaders({ host: 'tenant.example.com', 'x-forwarded-for': chain })

        await expect(resolveApiUrl('/v1')).rejects.toThrow(
          'INTERNAL_API_FORWARDED_FOR_TRIM must be a whole number',
        )
      })

      it('is ignored for absolute addresses', async () => {
        vi.stubEnv('INTERNAL_API_FORWARDED_FOR_TRIM', '1')

        await expect(resolveApiUrl('https://api.example.com/v1')).resolves.toEqual({
          url: 'https://api.example.com/v1',
          headers: {},
        })
        expect(headers).not.toHaveBeenCalled()
      })

      // The README's topologies. The API trusts the entry `trusted` places from the end of the
      // chain (DRF's NUM_PROXIES), set for browser requests; each proxy appends its peer.
      describe('in the README topologies', () => {
        const visitor = '203.0.113.7'
        const spoof = '198.51.100.66'
        const clientAddress = (chain: string, trusted: number) => {
          const entries = chain.split(',').map((entry) => entry.trim())
          return entries[entries.length - Math.min(trusted, entries.length)]
        }
        const serverSideCall = async (trim: string, incoming: string, appended: string[]) => {
          vi.stubEnv('INTERNAL_API_FORWARDED_FOR_TRIM', trim)
          mockIncomingHeaders({ host: 'tenant.example.com', 'x-forwarded-for': incoming })
          const { headers: forwarded } = await resolveApiUrl('/v1')
          return [forwarded['X-Forwarded-For'], ...appended].filter(Boolean).join(', ')
        }

        // Browser -> proxy A -> proxy B -> web server, and web server -> API directly (an
        // INTERNAL_API_ORIGIN such as http://web:8000). The API trusts 2 entries for browser
        // requests that reach it through A and B.
        const directIncoming = `${spoof}, ${visitor}, 172.18.0.5`

        it('keeps the visitor with 0 when INTERNAL_API_ORIGIN reaches the API directly', async () => {
          expect(clientAddress(await serverSideCall('0', directIncoming, []), 2)).toBe(visitor)
        })

        it.each(['1', '2'])(
          'hands the API a client-supplied address with %s on a direct INTERNAL_API_ORIGIN',
          async (trim) => {
            expect(clientAddress(await serverSideCall(trim, directIncoming, []), 2)).toBe(spoof)
          },
        )

        it("keeps the visitor with 1 when the API's own proxy appends the web server", async () => {
          // Browser -> two proxies -> web server; web server -> API's proxy -> API.
          const chain = await serverSideCall('1', `${spoof}, ${visitor}, 172.18.0.5`, ['10.0.0.9'])

          expect(chain).toBe(`${spoof}, ${visitor}, 10.0.0.9`)
          expect(clientAddress(chain, 2)).toBe(visitor)
        })
      })
    })

    it("lets next/headers' own error through outside a request", async () => {
      const outsideRequest = new Error('`headers` was called outside a request scope.')
      ;(headers as Mock).mockRejectedValue(outsideRequest)

      await expect(resolveApiUrl('/v1')).rejects.toBe(outsideRequest)
    })
  })
})
