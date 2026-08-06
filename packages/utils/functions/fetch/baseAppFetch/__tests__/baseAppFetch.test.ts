import humps from 'humps'
import * as nextHeadersNS from 'next/headers'
import type { Mock, MockInstance } from 'vitest'

import { baseAppFetch } from '..'
import { LOGOUT_EVENT } from '../../../../constants/events'
import { broadcastEvent } from '../../../events'
import * as getLanguageNS from '../../../language/getLanguage'
import { getToken, isUserTokenValid, refreshAccessToken } from '../../../token'
import * as decodeJWTNS from '../../../token/decodeJWT'
import * as getTokenNS from '../../../token/getToken'
import { getTokenSSR } from '../../../token/getTokenSSR'
import * as isUserTokenValidNS from '../../../token/isUserTokenValid'
import * as refreshAccessTokenNS from '../../../token/refreshAccessToken'

global.fetch = vi.fn()

Object.defineProperty(global, 'window', {
  value: {},
  writable: true,
})

vi.mock('humps', async () => {
  const fns = {
    decamelizeKeys: vi.fn().mockImplementation((keys) => keys),
    camelizeKeys: vi.fn().mockImplementation((keys) => keys),
  }
  return { ...fns, default: fns }
})
vi.mock('../../../events', async () => ({
  broadcastEvent: vi.fn(),
}))
vi.mock('../../../token', async () => ({
  getToken: vi.fn(),
  isUserTokenValid: vi.fn(),
  refreshAccessToken: vi.fn(),
  decodeJWT: vi.fn().mockImplementation(() => ({ exp: Date.now() / 1000 + 5000 })),
}))
vi.mock('../../../token/refreshAccessToken', async () => ({
  refreshAccessToken: vi.fn(),
}))
vi.mock('../../../token/isUserTokenValid', async () => ({
  isUserTokenValid: vi.fn(),
}))
vi.mock('../../../token/decodeJWT', async () => ({
  decodeJWT: vi.fn(),
}))
vi.mock('../../../token/getToken', async () => ({
  getToken: vi.fn(),
}))
vi.mock('../../../language/getLanguage', async () => ({
  getLanguage: vi.fn(),
}))
vi.mock('../../../token/getTokenSSR', async () => ({
  getTokenSSR: vi.fn(),
}))
vi.mock('next/headers', async () => ({
  cookies: vi.fn(),
}))

const DEFAULT_FETCH_RESPONSE = {
  ok: true,
  status: 200,
  headers: {
    get: vi.fn().mockReturnValue('application/json'),
  },
  json: vi.fn().mockResolvedValue({}),
} as Partial<Omit<Response, 'headers'>>

const mockFetch = (response = DEFAULT_FETCH_RESPONSE) => {
  const fetchMock = global.fetch as Mock
  fetchMock.mockResolvedValue(response)

  return response
}

let stringifySpy: MockInstance

describe('baseAppFetch', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    const humpsMock = humps.decamelizeKeys as Mock
    humpsMock.mockClear()
    stringifySpy = vi.spyOn(JSON, 'stringify')

    const dynamicGetToken = getTokenNS.getToken as Mock
    const dynamicGetLanguage = getLanguageNS.getLanguage as Mock
    const specificRefreshAccessToken = refreshAccessTokenNS.refreshAccessToken as Mock
    const specificIsUserTokenValid = isUserTokenValidNS.isUserTokenValid as Mock
    const specificDecodeJWT = decodeJWTNS.decodeJWT as Mock

    const staticGetTokenMock = getToken as Mock
    const staticRefreshAccessTokenMock = refreshAccessToken as Mock
    const staticIsUserTokenValidMock = isUserTokenValid as Mock

    dynamicGetToken.mockImplementation((...args: any[]) => staticGetTokenMock(...args))
    specificRefreshAccessToken.mockImplementation((...args: any[]) =>
      staticRefreshAccessTokenMock(...args),
    )
    specificIsUserTokenValid.mockImplementation((...args: any[]) =>
      staticIsUserTokenValidMock(...args),
    )
    specificDecodeJWT.mockReturnValue({ exp: Date.now() / 1000 + 5000 })
    dynamicGetLanguage.mockReturnValue(undefined)

    mockFetch()

    staticGetTokenMock.mockReturnValue(null)
    staticRefreshAccessTokenMock.mockResolvedValue('new-token')
    staticIsUserTokenValidMock.mockReturnValue(true)
  })

  afterEach(() => {
    stringifySpy.mockRestore()
  })

  it('should stringify and decamelize request body if required', async () => {
    const requestBody = { test_key: 'testValue' }
    mockFetch()

    await baseAppFetch('/test', {
      body: requestBody,
      method: 'POST',
    })

    expect(humps.decamelizeKeys).toHaveBeenCalledWith(requestBody)
    expect(stringifySpy).toHaveBeenCalledWith(requestBody)
  })

  it('should not stringify and decamelize the body if there is no body or if `stringifyBody` is false', async () => {
    mockFetch()

    await baseAppFetch('/test', {
      method: 'POST',
    })

    expect(humps.decamelizeKeys).not.toHaveBeenCalled()
    expect(stringifySpy).not.toHaveBeenCalled()

    await baseAppFetch('/test', {
      body: { test_key: 'testValue' },
      method: 'POST',
      stringifyBody: false,
    })
    expect(humps.decamelizeKeys).not.toHaveBeenCalled()
    expect(stringifySpy).not.toHaveBeenCalled()
  })

  it('should not decamelize the body if `decamelizeRequestBodyKeys` is false', async () => {
    const requestBody = { test_key: 'testValue' }
    await baseAppFetch('/test', {
      body: requestBody,
      method: 'POST',
      decamelizeRequestBodyKeys: false,
    })

    expect(humps.decamelizeKeys).not.toHaveBeenCalled()
    expect(stringifySpy).toHaveBeenCalledWith(requestBody)
  })

  it('should refresh token if it is invalid and auth is required', async () => {
    const getTokenMock = getToken as Mock
    getTokenMock.mockReturnValue('old-token')
    const isUserTokenValidMock = isUserTokenValid as Mock
    isUserTokenValidMock.mockReturnValue(false)
    const refreshAccessTokenMock = refreshAccessToken as Mock
    refreshAccessTokenMock.mockResolvedValue('new-token')

    await baseAppFetch('/test', {})

    expect(refreshAccessToken).toHaveBeenCalled()
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer new-token',
        }),
      }),
    )
  })

  it('should not attempt to refresh token if it is valid', async () => {
    const getTokenMock = getToken as Mock
    getTokenMock.mockReturnValue('valid-token')
    const isUserTokenValidMock = isUserTokenValid as Mock
    isUserTokenValidMock.mockReturnValue(true)
    const refreshAccessTokenMock = refreshAccessToken as Mock
    refreshAccessTokenMock.mockClear()

    await baseAppFetch('/test', {})

    expect(refreshAccessToken).not.toHaveBeenCalled()
  })

  it('should not attempt to refresh token if refreshToken is false', async () => {
    const getTokenMock = getToken as Mock
    getTokenMock.mockReturnValue('old-token')
    const isUserTokenValidMock = isUserTokenValid as Mock
    isUserTokenValidMock.mockReturnValue(false)

    await baseAppFetch('/test', { refreshToken: false })

    expect(refreshAccessToken).not.toHaveBeenCalled()
  })

  it('should not require auth for paths marked as not requiring a token', async () => {
    const getTokenMock = getToken as Mock
    getTokenMock.mockReturnValue('any-token')
    const path = '/no-auth-required'

    await baseAppFetch(path, { servicesWithoutToken: [/no-auth-required/] })

    expect(refreshAccessToken).not.toHaveBeenCalled()
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.not.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.any(String),
        }),
      }),
    )
  })

  it('should handle refreshAccessToken failure by emitting logout event', async () => {
    const getTokenMock = getToken as Mock
    getTokenMock.mockReturnValue('old-token')
    const isUserTokenValidMock = isUserTokenValid as Mock
    isUserTokenValidMock.mockReturnValue(false)
    const refreshAccessTokenMock = refreshAccessToken as Mock
    refreshAccessTokenMock.mockRejectedValue(new Error('Failed to refresh'))

    await expect(baseAppFetch('/test', {})).rejects.toThrow('Failed to refresh')
    expect(broadcastEvent).toHaveBeenCalledWith(LOGOUT_EVENT)
  })

  it('should set Authorization header correctly when using jwt token', async () => {
    const token = 'test-token'
    const getTokenMock = getToken as Mock
    getTokenMock.mockReturnValue(token)
    const isUserTokenValidMock = isUserTokenValid as Mock
    isUserTokenValidMock.mockReturnValue(true)

    const dynamicGetToken = getTokenNS.getToken as Mock
    dynamicGetToken.mockReturnValue(token)

    const refreshAccessTokenMock = refreshAccessToken as Mock
    refreshAccessTokenMock.mockClear()

    await baseAppFetch('/test', {})

    expect(refreshAccessToken).not.toHaveBeenCalled()
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${token}`,
        }),
      }),
    )
  })

  it('should set Authorization header when using Token tokentype', async () => {
    const token = 'test-token'
    const getTokenMock = getToken as Mock
    getTokenMock.mockReturnValue(token)
    const isUserTokenValidMock = isUserTokenValid as Mock
    isUserTokenValidMock.mockReturnValue(true)

    const dynamicGetToken = getTokenNS.getToken as Mock
    dynamicGetToken.mockReturnValue(token)

    const refreshAccessTokenMock = refreshAccessToken as Mock
    refreshAccessTokenMock.mockClear()

    await baseAppFetch('/test', { tokenType: 'Token' })

    expect(refreshAccessToken).not.toHaveBeenCalled()
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Token ${token}`,
        }),
      }),
    )
  })

  it('should set Content-Type header for applicable HTTP methods', async () => {
    await baseAppFetch('/test', { method: 'POST' })

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'application/json; charset=utf-8',
        }),
      }),
    )

    await baseAppFetch('/test', { method: 'PUT' })
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'application/json; charset=utf-8',
        }),
      }),
    )

    await baseAppFetch('/test', { method: 'PATCH' })
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'application/json; charset=utf-8',
        }),
      }),
    )

    await baseAppFetch('/test', { method: 'GET' })
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.not.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'application/json; charset=utf-8',
        }),
      }),
    )
  })

  it('should decamelize request params keys', async () => {
    const params = { testParam: 'value' }
    await baseAppFetch('/test', { params, baseUrl: 'http://test.api' })

    expect(humps.decamelizeKeys).toHaveBeenCalledWith(params)
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('http://test.api/test?testParam=value'),
      expect.any(Object),
    )
  })

  it('should not decamelize request params keys if `decamelizeRequestParamsKeys` is false', async () => {
    const params = { test_param: 'value' }
    await baseAppFetch('/test', {
      params,
      baseUrl: 'http://test.api',
      decamelizeRequestParamsKeys: false,
    })

    expect(humps.decamelizeKeys).not.toHaveBeenCalled()
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('http://test.api/test?test_param=value'),
      expect.any(Object),
    )
  })

  it('should not append params to the URL if there are no params', async () => {
    await baseAppFetch('/test', { baseUrl: 'http://test.api' })

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('http://test.api/test'),
      expect.any(Object),
    )
  })

  it('should camelize response data keys', async () => {
    const dataResponse = { testData: 'value' }
    mockFetch({
      ...DEFAULT_FETCH_RESPONSE,
      json: vi.fn().mockResolvedValue(dataResponse),
    })

    const response = await baseAppFetch('/test', {})
    expect(humps.camelizeKeys).toHaveBeenCalledWith(dataResponse)
    expect(response).toEqual(dataResponse)
  })

  it('should not camelize response data keys if `camelizeResponseDataKeys` is false', async () => {
    const dataResponse = { test_data: 'value' }
    mockFetch({
      ...DEFAULT_FETCH_RESPONSE,
      json: vi.fn().mockResolvedValue(dataResponse),
    })

    const response = await baseAppFetch('/test', { camelizeResponseDataKeys: false })
    expect(humps.camelizeKeys).not.toHaveBeenCalled()
    expect(response).toEqual(dataResponse)
  })

  describe('SSR functionality', () => {
    let originalWindow: any

    beforeEach(() => {
      originalWindow = global.window
      delete (global as any).window
    })

    afterEach(() => {
      global.window = originalWindow
    })

    it('should use getTokenSSR in SSR environment', async () => {
      const getTokenSSRMock = getTokenSSR as Mock
      getTokenSSRMock.mockResolvedValue('ssr-access-token')

      // Mock next/headers cookies
      const mockCookies = {
        get: vi.fn().mockReturnValue({ value: 'en' }),
      }
      const cookies = nextHeadersNS.cookies as Mock
      cookies.mockResolvedValue(mockCookies)

      await baseAppFetch('/test', {})

      expect(getTokenSSRMock).toHaveBeenCalledWith('Authorization')
      expect(getTokenSSRMock).toHaveBeenCalledWith('Refresh')
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer ssr-access-token',
            'Accept-Language': 'en',
          }),
        }),
      )
    })

    it('should handle SSR token refresh when token is invalid', async () => {
      const getTokenSSRMock = getTokenSSR as Mock
      getTokenSSRMock
        .mockResolvedValueOnce('Current-Profile')
        .mockResolvedValueOnce('invalid-access-token') // access token
        .mockResolvedValueOnce('ssr-refresh-token') // refresh token

      const isUserTokenValidMock = isUserTokenValid as Mock
      isUserTokenValidMock.mockReturnValue(false)

      const refreshAccessTokenMock = refreshAccessToken as Mock
      refreshAccessTokenMock.mockResolvedValue('new-ssr-access-token')

      const mockCookies = {
        get: vi.fn().mockReturnValue({ value: 'fr' }),
      }
      const cookies = nextHeadersNS.cookies as Mock
      cookies.mockResolvedValue(mockCookies)

      await baseAppFetch('/test', {})

      expect(getTokenSSRMock).toHaveBeenCalledWith('Authorization')
      expect(getTokenSSRMock).toHaveBeenCalledWith('Refresh')
      expect(refreshAccessToken).toHaveBeenCalledWith({
        refreshToken: 'ssr-refresh-token',
        accessKeyName: 'Authorization',
        refreshKeyName: 'Refresh',
      })
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer new-ssr-access-token',
            'Accept-Language': 'fr',
          }),
        }),
      )
    })

    it('should not use getTokenSSR when no auth is required in SSR', async () => {
      const getTokenSSRMock = getTokenSSR as Mock
      getTokenSSRMock.mockResolvedValue('ssr-token')

      const path = '/public-endpoint'
      await baseAppFetch(path, { servicesWithoutToken: [/public-endpoint/] })

      expect(getTokenSSRMock).toHaveBeenCalled()
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.not.objectContaining({
          headers: expect.objectContaining({
            Authorization: expect.any(String),
          }),
        }),
      )
    })

    it('should handle SSR language header from cookies', async () => {
      const getTokenSSRMock = getTokenSSR as Mock
      getTokenSSRMock.mockResolvedValue(null) // No token

      const mockCookies = {
        get: vi.fn().mockReturnValue({ value: 'es' }),
      }
      const cookies = nextHeadersNS.cookies as Mock
      cookies.mockResolvedValue(mockCookies)

      await baseAppFetch('/test', { languageCookieName: 'custom_language' })

      expect(mockCookies.get).toHaveBeenCalledWith('custom_language')
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Accept-Language': 'es',
          }),
        }),
      )
    })

    it('should handle missing language cookie in SSR', async () => {
      const getTokenSSRMock = getTokenSSR as Mock
      getTokenSSRMock.mockResolvedValue(null)

      const mockCookies = {
        get: vi.fn().mockReturnValue(undefined),
      }
      const cookies = nextHeadersNS.cookies as Mock
      cookies.mockResolvedValue(mockCookies)

      await baseAppFetch('/test', {})

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.not.objectContaining({
          headers: expect.objectContaining({
            'Accept-Language': expect.any(String),
          }),
        }),
      )
    })
  })
})
