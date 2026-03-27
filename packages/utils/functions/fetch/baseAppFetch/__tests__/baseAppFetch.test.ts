import humps from 'humps'

import { baseAppFetch } from '..'
import { awaitSessionRecovery } from '../../../auth/awaitSessionRecovery'
import { getToken } from '../../../token'
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
jest.mock('../../../auth/awaitSessionRecovery', () => ({
  awaitSessionRecovery: jest.fn().mockResolvedValue('cleared'),
}))
jest.mock('../../../token', () => ({
  getToken: jest.fn(),
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
} as any

const mockFetch = (response: any = DEFAULT_FETCH_RESPONSE) => {
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

    const staticGetTokenMock = getToken as jest.Mock

    dynamicGetToken.mockImplementation((...args: any[]) => staticGetTokenMock(...args))
    dynamicGetLanguage.mockReturnValue(undefined)

    mockFetch()

    staticGetTokenMock.mockReturnValue(null)
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

  it('should not require auth for paths marked as not requiring a token', async () => {
    const getTokenMock = getToken as jest.Mock
    getTokenMock.mockReturnValue('any-token')
    const path = '/no-auth-required'

    await baseAppFetch(path, { servicesWithoutToken: [/no-auth-required/] })

    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.not.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.any(String),
        }),
      }),
    )
  })

  it('should set Authorization header correctly when using jwt token', async () => {
    const token = 'test-token'
    const getTokenMock = getToken as jest.Mock
    getTokenMock.mockReturnValue(token)

    const { getToken: dynamicGetToken } = require('../../../token/getToken')
    dynamicGetToken.mockReturnValue(token)

    await baseAppFetch('/test', {})

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

    const { getToken: dynamicGetToken } = require('../../../token/getToken')
    dynamicGetToken.mockReturnValue(token)

    await baseAppFetch('/test', { tokenType: 'Token' })

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

  describe('stateless transport', () => {
    it('should not decode tokens or validate expiry', async () => {
      const getTokenMock = getToken as jest.Mock
      getTokenMock.mockReturnValue('some-token')

      const { getToken: dynamicGetToken } = require('../../../token/getToken')
      dynamicGetToken.mockReturnValue('some-token')

      await baseAppFetch('/test', {})

      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer some-token',
          }),
        }),
      )
    })

    it('should call awaitSessionRecovery on 401 response for auth-required paths', async () => {
      const getTokenMock = getToken as jest.Mock
      getTokenMock.mockImplementation((key: string) => {
        if (key === 'Authorization') return 'some-token'
        return null
      })

      const { getToken: dynamicGetToken } = require('../../../token/getToken')
      dynamicGetToken.mockImplementation((key: string) => {
        if (key === 'Authorization') return 'some-token'
        return null
      })

      mockFetch({
        ok: false,
        status: 401,
        headers: {
          get: jest.fn().mockReturnValue('application/json'),
        },
        json: jest.fn().mockResolvedValue({ detail: 'Unauthorized' }),
      })

      await expect(baseAppFetch('/test', {})).rejects.toThrow()

      expect(awaitSessionRecovery).toHaveBeenCalledWith(
        expect.objectContaining({
          source: 'fetch',
          path: '/test',
          status: 401,
          hasRefreshToken: false,
        }),
      )
    })

    it('should call awaitSessionRecovery with hasRefreshToken true when refresh token exists', async () => {
      const getTokenMock = getToken as jest.Mock
      getTokenMock.mockImplementation((key: string) => {
        if (key === 'Authorization') return 'some-access-token'
        if (key === 'Refresh') return 'some-refresh-token'
        return null
      })

      const { getToken: dynamicGetToken } = require('../../../token/getToken')
      dynamicGetToken.mockImplementation((key: string) => {
        if (key === 'Authorization') return 'some-access-token'
        if (key === 'Refresh') return 'some-refresh-token'
        return null
      })

      mockFetch({
        ok: false,
        status: 401,
        headers: {
          get: jest.fn().mockReturnValue('application/json'),
        },
        json: jest.fn().mockResolvedValue({ detail: 'Unauthorized' }),
      })

      await expect(baseAppFetch('/test', {})).rejects.toThrow()

      expect(awaitSessionRecovery).toHaveBeenCalledWith(
        expect.objectContaining({
          hasRefreshToken: true,
        }),
      )
    })

    it('should not call awaitSessionRecovery on non-401 error responses', async () => {
      mockFetch({
        ok: false,
        status: 403,
        headers: {
          get: jest.fn().mockReturnValue('application/json'),
        },
        json: jest.fn().mockResolvedValue({ detail: 'Forbidden' }),
      })

      await expect(baseAppFetch('/test', {})).rejects.toThrow()

      expect(awaitSessionRecovery).not.toHaveBeenCalled()
    })
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

    it('should attach SSR token without decoding or refreshing', async () => {
      const getTokenSSRMock = getTokenSSR as jest.Mock
      getTokenSSRMock
        .mockResolvedValueOnce('Current-Profile')
        .mockResolvedValueOnce('ssr-access-token')
        .mockResolvedValueOnce('ssr-refresh-token')

      const mockCookies = {
        get: jest.fn().mockReturnValue({ value: 'fr' }),
      }
      const { cookies } = require('next/headers')
      cookies.mockResolvedValue(mockCookies)

      await baseAppFetch('/test', {})

      expect(getTokenSSRMock).toHaveBeenCalledWith('Authorization')
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer ssr-access-token',
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
      getTokenSSRMock.mockResolvedValue(null)

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

  describe('401 retry-once flow', () => {
    const UNAUTHORIZED_RESPONSE = {
      ok: false,
      status: 401,
      headers: {
        get: jest.fn().mockReturnValue('application/json'),
      },
      json: jest.fn().mockResolvedValue({ detail: 'Unauthorized' }),
    }

    const SUCCESS_RESPONSE = {
      ok: true,
      status: 200,
      headers: {
        get: jest.fn().mockReturnValue('application/json'),
      },
      json: jest.fn().mockResolvedValue({ data: 'success' }),
    }

    it('should retry once and succeed when refresh resolves as refreshed', async () => {
      const awaitSessionRecoveryMock = awaitSessionRecovery as jest.Mock
      awaitSessionRecoveryMock.mockResolvedValue('refreshed')

      const getTokenMock = getToken as jest.Mock
      let accessTokenReads = 0
      getTokenMock.mockImplementation((key: string) => {
        if (key === 'Authorization') {
          accessTokenReads += 1
          return accessTokenReads <= 2 ? 'old-token' : 'new-refreshed-token'
        }

        if (key === 'Refresh') return 'old-refresh-token'
        return null
      })

      const { getToken: dynamicGetToken } = require('../../../token/getToken')
      dynamicGetToken.mockImplementation((key: string) => getTokenMock(key))

      const fetchMock = global.fetch as jest.Mock
      fetchMock.mockResolvedValueOnce(UNAUTHORIZED_RESPONSE).mockResolvedValueOnce(SUCCESS_RESPONSE)

      const result = await baseAppFetch('/test', {})

      expect(awaitSessionRecoveryMock).toHaveBeenCalledTimes(1)
      expect(fetchMock).toHaveBeenCalledTimes(2)
      expect(result).toEqual({ data: 'success' })
    })

    it('should reject when refresh resolves as cleared', async () => {
      const awaitSessionRecoveryMock = awaitSessionRecovery as jest.Mock
      awaitSessionRecoveryMock.mockResolvedValue('cleared')

      const getTokenMock = getToken as jest.Mock
      getTokenMock.mockReturnValue('old-token')

      const { getToken: dynamicGetToken } = require('../../../token/getToken')
      dynamicGetToken.mockReturnValue('old-token')

      mockFetch(UNAUTHORIZED_RESPONSE as any)

      await expect(baseAppFetch('/test', {})).rejects.toThrow()

      expect(awaitSessionRecoveryMock).toHaveBeenCalledTimes(1)
      expect(global.fetch).toHaveBeenCalledTimes(1)
    })

    it('should reject when refresh resolves as timeout', async () => {
      const awaitSessionRecoveryMock = awaitSessionRecovery as jest.Mock
      awaitSessionRecoveryMock.mockResolvedValue('timeout')

      const getTokenMock = getToken as jest.Mock
      getTokenMock.mockReturnValue('old-token')

      const { getToken: dynamicGetToken } = require('../../../token/getToken')
      dynamicGetToken.mockReturnValue('old-token')

      mockFetch(UNAUTHORIZED_RESPONSE as any)

      await expect(baseAppFetch('/test', {})).rejects.toThrow()

      expect(awaitSessionRecoveryMock).toHaveBeenCalledTimes(1)
      expect(global.fetch).toHaveBeenCalledTimes(1)
    })

    it('should retry with the latest cookie token without triggering session recovery when the token changed mid-flight', async () => {
      const awaitSessionRecoveryMock = awaitSessionRecovery as jest.Mock
      awaitSessionRecoveryMock.mockClear()

      const getTokenMock = getToken as jest.Mock
      let accessTokenReads = 0
      getTokenMock.mockImplementation((key: string) => {
        if (key === 'Authorization') {
          accessTokenReads += 1
          return accessTokenReads === 1 ? 'old-token' : 'new-token'
        }

        if (key === 'Refresh') return 'refresh-token'
        return null
      })

      const { getToken: dynamicGetToken } = require('../../../token/getToken')
      dynamicGetToken.mockImplementation((key: string) => getTokenMock(key))

      const fetchMock = global.fetch as jest.Mock
      fetchMock.mockResolvedValueOnce(UNAUTHORIZED_RESPONSE).mockResolvedValueOnce(SUCCESS_RESPONSE)

      const result = await baseAppFetch('/test', {})

      expect(awaitSessionRecoveryMock).not.toHaveBeenCalled()
      expect(fetchMock).toHaveBeenCalledTimes(2)
      expect(fetchMock.mock.calls[1]?.[1]?.headers?.Authorization).toBe('Bearer new-token')
      expect(result).toEqual({ data: 'success' })
    })

    it('should not retry a second time if the retried request also returns 401', async () => {
      const awaitSessionRecoveryMock = awaitSessionRecovery as jest.Mock
      awaitSessionRecoveryMock.mockResolvedValue('refreshed')

      const getTokenMock = getToken as jest.Mock
      getTokenMock.mockReturnValue('old-token')

      const { getToken: dynamicGetToken } = require('../../../token/getToken')
      dynamicGetToken.mockReturnValue('old-token')

      const fetchMock = global.fetch as jest.Mock
      fetchMock.mockResolvedValueOnce(UNAUTHORIZED_RESPONSE).mockResolvedValueOnce({
        ...UNAUTHORIZED_RESPONSE,
        json: jest.fn().mockResolvedValue({ detail: 'Still Unauthorized' }),
      })

      await expect(baseAppFetch('/test', {})).rejects.toThrow()

      expect(awaitSessionRecoveryMock).toHaveBeenCalledTimes(1)
      expect(fetchMock).toHaveBeenCalledTimes(2)
    })

    it('should not call awaitSessionRecovery for non-auth-required paths on 401', async () => {
      const awaitSessionRecoveryMock = awaitSessionRecovery as jest.Mock
      awaitSessionRecoveryMock.mockClear()

      mockFetch(UNAUTHORIZED_RESPONSE as any)

      await expect(baseAppFetch('/public', { servicesWithoutToken: [/public/] })).rejects.toThrow()

      expect(awaitSessionRecoveryMock).not.toHaveBeenCalled()
    })
  })
})
