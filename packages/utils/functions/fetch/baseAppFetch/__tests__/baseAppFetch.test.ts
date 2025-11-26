import humps from 'humps'

import { baseAppFetch } from '..'
import { LOGOUT_EVENT } from '../../../../constants/events'
import { eventEmitter } from '../../../events'
import { getToken, isUserTokenValid, refreshAccessToken } from '../../../token'
import { getTokenSSR } from '../../../token/getTokenSSR'

global.fetch = jest.fn()

Object.defineProperty(global, 'window', {
  value: {},
  writable: true,
})

jest.mock('humps', () => ({
  decamelizeKeys: jest.fn().mockImplementation((keys) => keys),
  camelizeKeys: jest.fn().mockImplementation((keys) => keys),
}))
jest.mock('../../../events', () => ({
  eventEmitter: {
    emit: jest.fn(),
    listenerCount: jest.fn().mockReturnValue(1),
  },
}))
jest.mock('../../../token', () => ({
  getToken: jest.fn(),
  isUserTokenValid: jest.fn(),
  refreshAccessToken: jest.fn(),
  decodeJWT: jest.fn().mockImplementation(() => ({ exp: Date.now() / 1000 + 5000 })),
}))
jest.mock('../../../token/refreshAccessToken', () => ({
  refreshAccessToken: jest.fn(),
}))
jest.mock('../../../token/isUserTokenValid', () => ({
  isUserTokenValid: jest.fn(),
}))
jest.mock('../../../token/decodeJWT', () => ({
  decodeJWT: jest.fn(),
}))
jest.mock('../../../token/getToken', () => ({
  getToken: jest.fn(),
}))
jest.mock('../../../language/getLanguage', () => ({
  getLanguage: jest.fn(),
}))
jest.mock('../../../token/getTokenSSR', () => ({
  getTokenSSR: jest.fn(),
}))
jest.mock('next/headers', () => ({
  cookies: jest.fn(),
}))

const DEFAULT_FETCH_RESPONSE = {
  ok: true,
  status: 200,
  headers: {
    get: jest.fn().mockReturnValue('application/json'),
  },
  json: jest.fn().mockResolvedValue({}),
} as Partial<Omit<Response, 'headers'>>

const mockFetch = (response = DEFAULT_FETCH_RESPONSE) => {
  const fetchMock = global.fetch as jest.Mock
  fetchMock.mockResolvedValue(response)

  return response
}

let stringifySpy: jest.SpyInstance

describe('baseAppFetch', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    const humpsMock = humps.decamelizeKeys as jest.Mock
    humpsMock.mockClear()
    stringifySpy = jest.spyOn(JSON, 'stringify')

    const { getToken: dynamicGetToken } = require('../../../token/getToken')
    const { getLanguage: dynamicGetLanguage } = require('../../../language/getLanguage')
    const {
      refreshAccessToken: specificRefreshAccessToken,
    } = require('../../../token/refreshAccessToken')
    const {
      isUserTokenValid: specificIsUserTokenValid,
    } = require('../../../token/isUserTokenValid')
    const { decodeJWT: specificDecodeJWT } = require('../../../token/decodeJWT')

    const staticGetTokenMock = getToken as jest.Mock
    const staticRefreshAccessTokenMock = refreshAccessToken as jest.Mock
    const staticIsUserTokenValidMock = isUserTokenValid as jest.Mock

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
    const getTokenMock = getToken as jest.Mock
    getTokenMock.mockReturnValue('old-token')
    const isUserTokenValidMock = isUserTokenValid as jest.Mock
    isUserTokenValidMock.mockReturnValue(false)
    const refreshAccessTokenMock = refreshAccessToken as jest.Mock
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
    const getTokenMock = getToken as jest.Mock
    getTokenMock.mockReturnValue('valid-token')
    const isUserTokenValidMock = isUserTokenValid as jest.Mock
    isUserTokenValidMock.mockReturnValue(true)
    const refreshAccessTokenMock = refreshAccessToken as jest.Mock
    refreshAccessTokenMock.mockClear()

    await baseAppFetch('/test', {})

    expect(refreshAccessToken).not.toHaveBeenCalled()
  })

  it('should not attempt to refresh token if refreshToken is false', async () => {
    const getTokenMock = getToken as jest.Mock
    getTokenMock.mockReturnValue('old-token')
    const isUserTokenValidMock = isUserTokenValid as jest.Mock
    isUserTokenValidMock.mockReturnValue(false)

    await baseAppFetch('/test', { refreshToken: false })

    expect(refreshAccessToken).not.toHaveBeenCalled()
  })

  it('should not require auth for paths marked as not requiring a token', async () => {
    const getTokenMock = getToken as jest.Mock
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
    const getTokenMock = getToken as jest.Mock
    getTokenMock.mockReturnValue('old-token')
    const isUserTokenValidMock = isUserTokenValid as jest.Mock
    isUserTokenValidMock.mockReturnValue(false)
    const refreshAccessTokenMock = refreshAccessToken as jest.Mock
    refreshAccessTokenMock.mockRejectedValue(new Error('Failed to refresh'))

    await expect(baseAppFetch('/test', {})).rejects.toThrow('Failed to refresh')
    expect(eventEmitter.emit).toHaveBeenCalledWith(LOGOUT_EVENT)
  })

  it('should set Authorization header correctly when using jwt token', async () => {
    const token = 'test-token'
    const getTokenMock = getToken as jest.Mock
    getTokenMock.mockReturnValue(token)
    const isUserTokenValidMock = isUserTokenValid as jest.Mock
    isUserTokenValidMock.mockReturnValue(true)

    const { getToken: dynamicGetToken } = require('../../../token/getToken')
    dynamicGetToken.mockReturnValue(token)

    const refreshAccessTokenMock = refreshAccessToken as jest.Mock
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
    const getTokenMock = getToken as jest.Mock
    getTokenMock.mockReturnValue(token)
    const isUserTokenValidMock = isUserTokenValid as jest.Mock
    isUserTokenValidMock.mockReturnValue(true)

    const { getToken: dynamicGetToken } = require('../../../token/getToken')
    dynamicGetToken.mockReturnValue(token)

    const refreshAccessTokenMock = refreshAccessToken as jest.Mock
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
      json: jest.fn().mockResolvedValue(dataResponse),
    })

    const response = await baseAppFetch('/test', {})
    expect(humps.camelizeKeys).toHaveBeenCalledWith(dataResponse)
    expect(response).toEqual(dataResponse)
  })

  it('should not camelize response data keys if `camelizeResponseDataKeys` is false', async () => {
    const dataResponse = { test_data: 'value' }
    mockFetch({
      ...DEFAULT_FETCH_RESPONSE,
      json: jest.fn().mockResolvedValue(dataResponse),
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
      const getTokenSSRMock = getTokenSSR as jest.Mock
      getTokenSSRMock.mockResolvedValue('ssr-access-token')

      // Mock next/headers cookies
      const mockCookies = {
        get: jest.fn().mockReturnValue({ value: 'en' }),
      }
      const { cookies } = require('next/headers')
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
      const getTokenSSRMock = getTokenSSR as jest.Mock
      getTokenSSRMock
        .mockResolvedValueOnce('Current-Profile')
        .mockResolvedValueOnce('invalid-access-token') // access token
        .mockResolvedValueOnce('ssr-refresh-token') // refresh token

      const isUserTokenValidMock = isUserTokenValid as jest.Mock
      isUserTokenValidMock.mockReturnValue(false)

      const refreshAccessTokenMock = refreshAccessToken as jest.Mock
      refreshAccessTokenMock.mockResolvedValue('new-ssr-access-token')

      const mockCookies = {
        get: jest.fn().mockReturnValue({ value: 'fr' }),
      }
      const { cookies } = require('next/headers')
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
      const getTokenSSRMock = getTokenSSR as jest.Mock
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
      const getTokenSSRMock = getTokenSSR as jest.Mock
      getTokenSSRMock.mockResolvedValue(null) // No token

      const mockCookies = {
        get: jest.fn().mockReturnValue({ value: 'es' }),
      }
      const { cookies } = require('next/headers')
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
      const getTokenSSRMock = getTokenSSR as jest.Mock
      getTokenSSRMock.mockResolvedValue(null)

      const mockCookies = {
        get: jest.fn().mockReturnValue(undefined),
      }
      const { cookies } = require('next/headers')
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
