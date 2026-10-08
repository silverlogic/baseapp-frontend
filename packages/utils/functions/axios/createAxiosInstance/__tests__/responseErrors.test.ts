import { AxiosError, AxiosHeaders } from 'axios'
import type { AxiosAdapter } from 'axios'

import { createAxiosInstance } from '..'

jest.mock('../../../token/getToken', () => ({ getToken: () => null }))
jest.mock('../../../token/getTokenSSR', () => ({ getTokenSSR: async () => null }))

const jsonBody = { detail_code: 'mailbox_access_revoked', nested_error: { mailbox_id: 7 } }

const rejectedRequest = async (
  status: number,
  camelize = true,
  contentType = 'application/json',
) => {
  const { axios } = createAxiosInstance({ refreshToken: false, camelizeResponseDataKeys: camelize })
  let original: AxiosError | undefined
  const adapter: AxiosAdapter = async (config) => {
    const response = {
      data: JSON.stringify(jsonBody),
      status,
      statusText: status === 403 ? 'Forbidden' : 'Service Unavailable',
      headers: new AxiosHeaders({ 'content-type': contentType }),
      config,
    }
    original = new AxiosError(
      'Request failed',
      'ERR_BAD_RESPONSE',
      config,
      { id: 'request' },
      response,
    )
    throw original
  }
  axios.defaults.adapter = adapter
  let caught: unknown
  try {
    await axios.get('/mail/outbox', {
      headers: { 'X-Silver-Mailbox': '7' },
      timeout: 12000,
    })
  } catch (error) {
    caught = error
  }
  return { caught, original }
}

describe('createAxiosInstance response errors with the real Axios pipeline', () => {
  it.each([503, 403])(
    'retains the original Axios error and request scope for JSON %s',
    async (status) => {
      const { caught, original } = await rejectedRequest(status)
      expect(caught).toBe(original)
      expect(caught).toBeInstanceOf(AxiosError)
      expect(original?.isAxiosError).toBe(true)
      expect(original?.response?.status).toBe(status)
      expect(original?.status).toBe(status)
      expect(original?.code).toBe('ERR_BAD_RESPONSE')
      expect(original?.request).toEqual({ id: 'request' })
      expect(original?.config).toBe(original?.response?.config)
      expect(original?.config?.headers.get('X-Silver-Mailbox')).toBe('7')
      expect(original?.config?.timeout).toBe(12000)
      expect(original?.response?.data).toEqual({
        detailCode: 'mailbox_access_revoked',
        nestedError: { mailboxId: 7 },
      })
    },
  )

  it('preserves the wire keys and original error when camelizing is disabled', async () => {
    const { caught, original } = await rejectedRequest(403, false)
    expect(caught).toBe(original)
    expect(original?.response?.status).toBe(403)
    expect(original?.response?.data).toEqual(jsonBody)
  })

  it('leaves non-JSON errors and their metadata intact', async () => {
    const { caught, original } = await rejectedRequest(503, true, 'text/plain')
    expect(caught).toBe(original)
    expect(original?.response?.status).toBe(503)
    expect(original?.response?.data).toEqual(jsonBody)
  })
})
