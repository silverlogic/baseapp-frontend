import humps from 'humps'

import { baseAppFetch } from '..'
import { LOGOUT_EVENT } from '../../../../constants/events'
import { TokenTypes } from '../../../../constants/token'
import { eventEmitter } from '../../../events'
import { getToken, isUserTokenValid, refreshAccessToken } from '../../../token'

global.fetch = jest.fn()
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
    process.env.NEXT_PUBLIC_TOKEN_TYPE = TokenTypes.jwt
    jest.clearAllMocks()
    const humpsMock = humps.decamelizeKeys as jest.Mock
    humpsMock.mockClear()
    stringifySpy = jest.spyOn(JSON, 'stringify')
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

  it('should skip token refresh if token type is not jwt', async () => {
    process.env.NEXT_PUBLIC_TOKEN_TYPE = TokenTypes.simple
    const getTokenMock = getToken as jest.Mock
    getTokenMock.mockReturnValue('simple-token')

    await baseAppFetch('/test', {})

    expect(refreshAccessToken).not.toHaveBeenCalled()
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

    await baseAppFetch('/test', {})

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

  it('should set Authorization header correctly when using simple token', async () => {
    const token = 'test-token'
    const getTokenMock = getToken as jest.Mock
    getTokenMock.mockReturnValue(token)
    const isUserTokenValidMock = isUserTokenValid as jest.Mock
    isUserTokenValidMock.mockReturnValue(true)
    process.env.NEXT_PUBLIC_TOKEN_TYPE = TokenTypes.simple

    await baseAppFetch('/test', {})

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
          'Content-Type': 'application/json',
        }),
      }),
    )

    await baseAppFetch('/test', { method: 'PUT' })
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      }),
    )

    await baseAppFetch('/test', { method: 'PATCH' })
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      }),
    )

    await baseAppFetch('/test', { method: 'GET' })
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.not.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
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
})
