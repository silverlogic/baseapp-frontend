import { axios } from '@baseapp-frontend/utils'

import MfaApi from '../mfa'

// axios is not a direct dependency of this package, so take its types from the shared instance
type AxiosAdapter = Extract<NonNullable<typeof axios.defaults.adapter>, (...args: any[]) => any>
type InternalAxiosRequestConfig = Parameters<AxiosAdapter>[0]

// Runs `MfaApi` through the real shared axios instance (its request/response interceptors
// included) and swaps only the transport, so these tests cover the bodies the backend
// receives and the snake_case → camelCase mapping of what it sends back.
describe('MfaApi over the shared axios instance', () => {
  const originalAdapter = axios.defaults.adapter
  let requests: InternalAxiosRequestConfig[]

  const respondWith =
    (data: unknown, status = 200): AxiosAdapter =>
    async (config) => {
      requests.push(config)
      return {
        data,
        status,
        statusText: 'OK',
        headers: { 'content-type': 'application/json' },
        config,
      }
    }

  beforeEach(() => {
    requests = []
  })

  afterEach(() => {
    axios.defaults.adapter = originalAdapter
  })

  it('maps the backend backup_codes to backupCodes', async () => {
    axios.defaults.adapter = respondWith({ backup_codes: ['abc123', 'def456'] })

    await expect(
      MfaApi.regenerateBackupCodes({ method: 'email', code: '123456' }),
    ).resolves.toEqual({ backupCodes: ['abc123', 'def456'] })
    expect(requests[0]?.url).toBe('/auth/mfa/email/codes/regenerate/')
    expect(JSON.parse(requests[0]?.data)).toEqual({ code: '123456' })
  })

  it('regenerates backup codes without a code by sending an empty body', async () => {
    axios.defaults.adapter = respondWith({ backup_codes: ['abc123'] })

    await MfaApi.regenerateBackupCodes({ method: 'email' })

    expect(JSON.parse(requests[0]?.data)).toEqual({})
  })

  it('posts the new primary method and its code', async () => {
    axios.defaults.adapter = respondWith('', 204)

    await MfaApi.changePrimaryMethod({ method: 'app', code: '123456' })

    expect(requests[0]?.method).toBe('post')
    expect(requests[0]?.url).toBe('/auth/mfa/change-primary-method/')
    expect(JSON.parse(requests[0]?.data)).toEqual({ method: 'app', code: '123456' })
  })

  it('requests a code for the primary method', async () => {
    axios.defaults.adapter = respondWith({ details: 'Email message with MFA code has been sent.' })

    await expect(MfaApi.sendCode()).resolves.toEqual({
      details: 'Email message with MFA code has been sent.',
    })
    expect(requests[0]?.method).toBe('post')
    expect(requests[0]?.url).toBe('/auth/mfa/code/request/')
  })
})
