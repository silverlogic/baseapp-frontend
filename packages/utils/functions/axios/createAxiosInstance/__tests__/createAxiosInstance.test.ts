import humps from 'humps'

import { createAxiosInstance } from '..'

jest.mock('humps', () => ({
  decamelize: jest.fn().mockImplementation((key) => key.replace(/([A-Z])/g, '_$1').toLowerCase()),
  decamelizeKeys: jest.fn().mockImplementation((keys) => keys),
  camelizeKeys: jest.fn().mockImplementation((keys) => keys),
}))
jest.mock('axios', () => ({
  ...jest.requireActual('axios'),
  create: () => ({
    defaults: jest.requireActual('axios').create().defaults,
    interceptors: {
      ...jest.requireActual('axios').create().interceptors,
      request: { eject: jest.fn(), use: jest.fn() },
      response: { eject: jest.fn(), use: jest.fn() },
    },
  }),
}))
jest.mock('js-cookie', () => ({
  ...jest.requireActual('js-cookie'),
  get: () => 'someLanguage',
}))
jest.mock('../../../token/decodeJWT', () => ({
  decodeJWT: jest.fn(() => ({ exp: 1234567890 })),
}))
jest.mock('../../../token/isUserTokenValid', () => ({
  isUserTokenValid: jest.fn(() => true),
}))
jest.mock('../../../token/refreshAccessToken', () => ({
  refreshAccessToken: jest.fn().mockResolvedValue('refreshedAuthToken'),
}))
jest.mock('../../../token/getToken', () => ({
  getToken: jest.fn().mockReturnValue('someAuthToken'),
}))
jest.mock('../../../token/getTokenSSR', () => ({
  getTokenSSR: jest.fn().mockResolvedValue('someAuthToken'),
}))
jest.mock('../../../events', () => ({
  eventEmitter: {
    emit: jest.fn(),
    listenerCount: jest.fn().mockReturnValue(1),
  },
}))

// Mock the global window object
Object.defineProperty(global, 'window', {
  value: {},
  writable: true,
})

describe('createAxiosInstance', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should set default headers for post, patch, and put methods', () => {
    const { axios } = createAxiosInstance()

    expect(axios.defaults.headers.post['Content-Type']).toEqual('application/json')
    expect(axios.defaults.headers.patch['Content-Type']).toEqual('application/json')
    expect(axios.defaults.headers.put['Content-Type']).toEqual('application/json')
  })

  it('should set file headers for post, patch, and put methods', () => {
    const { axios } = createAxiosInstance({ file: true })

    expect(axios.defaults.headers.post['Content-Type']).toEqual('multipart/form-data')
    expect(axios.defaults.headers.patch['Content-Type']).toEqual('multipart/form-data')
    expect(axios.defaults.headers.put['Content-Type']).toEqual('multipart/form-data')
  })

  it('should use Token as tokenType when provided', async () => {
    const {
      axios: {
        interceptors: {
          request: { use },
        },
      },
    } = createAxiosInstance({ tokenType: 'Token' })

    const [[interceptorFn]] = (use as jest.Mock).mock.calls

    const request = {
      headers: { Authorization: undefined },
      url: 'someUrl',
    }

    await interceptorFn(request)

    expect(request.headers.Authorization).toBe('Token someAuthToken')
  })

  it('should add Authorization header using jwt authToken by default', async () => {
    const {
      axios: {
        interceptors: {
          request: { use },
        },
      },
    } = createAxiosInstance()

    const [[interceptorFn]] = (use as jest.Mock).mock.calls
    const request = { headers: { Authorization: undefined }, url: 'someUrl' }

    await interceptorFn(request)

    expect(request.headers.Authorization).toBe('Bearer someAuthToken')
  })

  it('should not add Authorization header for services without token', async () => {
    const {
      axios: {
        interceptors: {
          request: { use },
        },
      },
    } = createAxiosInstance({
      servicesWithoutToken: [/\/someUrl$/, /\/someUrl\/\d+\/withSomethingInTheMiddle$/],
    })

    const [[interceptorFn]] = (use as jest.Mock).mock.calls

    let request = { headers: { Authorization: undefined }, url: '/someUrl' }
    await interceptorFn(request)
    expect(request.headers.Authorization).toBeUndefined()

    request = {
      headers: { Authorization: undefined },
      url: '/someUrl/123/withSomethingInTheMiddle',
    }
    await interceptorFn(request)
    expect(request.headers.Authorization).toBeUndefined()
  })

  it('should be able to eject an interceptor', () => {
    const {
      axios: {
        interceptors: {
          request: { eject },
        },
      },
      requestInterceptorId,
    } = createAxiosInstance()

    eject(requestInterceptorId)
    expect(eject).toBeCalledWith(requestInterceptorId)
  })

  it('should transform request.data to FormData when file is true and useFormData is true', async () => {
    // @ts-ignore
    global.FormData = class MockFormData {
      _store = {}
      append(key: any, value: any) {
        // @ts-ignore
        this._store[key] = value
      }
      has(key: any) {
        return Object.prototype.hasOwnProperty.call(this._store, key)
      }
    }

    const {
      axios: {
        interceptors: {
          request: { use },
        },
      },
    } = createAxiosInstance({ file: true, useFormData: true })

    const [[interceptorFn]] = (use as jest.Mock).mock.calls

    const request = {
      data: { someKey: 'someValue' },
      headers: {},
    }

    await interceptorFn(request)

    expect(request.data instanceof FormData).toBeTruthy()
  })

  it('should stringify and decamelize request body by default', async () => {
    const {
      axios: {
        interceptors: {
          request: { use },
        },
      },
    } = createAxiosInstance()

    const [[interceptorFn]] = (use as jest.Mock).mock.calls

    const requestBody = { testKey: 'testValue' }
    const request = { data: requestBody, method: 'POST', headers: {} }

    await interceptorFn(request)

    expect(humps.decamelizeKeys).toHaveBeenCalledWith(requestBody)
    expect(request.data).toEqual(JSON.stringify(requestBody))
  })

  it('should not stringify and decamelize the body if `stringifyBody` is false', async () => {
    const {
      axios: {
        interceptors: {
          request: { use },
        },
      },
    } = createAxiosInstance({ stringifyBody: false })

    const [[interceptorFn]] = (use as jest.Mock).mock.calls

    const requestBody = { testKey: 'testValue' }
    const request = { data: requestBody, method: 'POST', headers: {} }

    await interceptorFn(request)

    expect(humps.decamelizeKeys).toHaveBeenCalledWith(requestBody)
    expect(request.data).toEqual(requestBody)
  })

  it('should not decamelize the body if `decamelizeRequestBodyKeys` is false', async () => {
    const {
      axios: {
        interceptors: {
          request: { use },
        },
      },
    } = createAxiosInstance({ decamelizeRequestBodyKeys: false })

    const [[interceptorFn]] = (use as jest.Mock).mock.calls

    const requestBody = { testKey: 'testValue' }
    const request = { data: requestBody, method: 'POST', headers: {} }

    await interceptorFn(request)

    expect(humps.decamelizeKeys).not.toHaveBeenCalled()
    expect(request.data).toEqual(JSON.stringify(requestBody))
  })

  it('should decamelize request params keys by default', async () => {
    const {
      axios: {
        interceptors: {
          request: { use },
        },
      },
    } = createAxiosInstance()

    const [[interceptorFn]] = (use as jest.Mock).mock.calls

    const params = { testParam: 'value' }
    const request = { params, headers: {}, method: 'GET' }

    await interceptorFn(request)

    expect(humps.decamelizeKeys).toHaveBeenCalledWith(params)
  })

  it('should not decamelize request params keys if `decamelizeRequestParamsKeys` is false', async () => {
    const {
      axios: {
        interceptors: {
          request: { use },
        },
      },
    } = createAxiosInstance({ decamelizeRequestParamsKeys: false })

    const [[interceptorFn]] = (use as jest.Mock).mock.calls

    const params = { testParam: 'value' }
    const request = { params, headers: {}, method: 'GET' }

    await interceptorFn(request)

    expect(humps.decamelizeKeys).not.toHaveBeenCalled()
    expect(request.params).toEqual(params)
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
      const { getTokenSSR } = require('../../../token/getTokenSSR')
      const getTokenSSRMock = getTokenSSR as jest.Mock
      getTokenSSRMock.mockResolvedValue('ssr-access-token')

      const {
        axios: {
          interceptors: {
            request: { use },
          },
        },
      } = createAxiosInstance()

      const [[interceptorFn]] = (use as jest.Mock).mock.calls

      const request = {
        headers: { Authorization: undefined },
        url: 'someUrl',
      }

      await interceptorFn(request)

      expect(getTokenSSRMock).toHaveBeenCalledWith('Authorization')
      expect(getTokenSSRMock).toHaveBeenCalledWith('Refresh')
      expect(request.headers.Authorization).toBe('Bearer ssr-access-token')
    })

    it('should handle SSR token refresh when token is invalid', async () => {
      const { getTokenSSR } = require('../../../token/getTokenSSR')
      const { isUserTokenValid } = require('../../../token/isUserTokenValid')
      const { refreshAccessToken } = require('../../../token/refreshAccessToken')

      const getTokenSSRMock = getTokenSSR as jest.Mock
      getTokenSSRMock
        .mockResolvedValueOnce('invalid-access-token') // access token
        .mockResolvedValueOnce('ssr-refresh-token') // refresh token

      const isUserTokenValidMock = isUserTokenValid as jest.Mock
      isUserTokenValidMock.mockReturnValue(false)

      const refreshAccessTokenMock = refreshAccessToken as jest.Mock
      refreshAccessTokenMock.mockResolvedValue('new-ssr-access-token')

      const {
        axios: {
          interceptors: {
            request: { use },
          },
        },
      } = createAxiosInstance()

      const [[interceptorFn]] = (use as jest.Mock).mock.calls

      const request = {
        headers: { Authorization: undefined },
        url: 'someUrl',
      }

      await interceptorFn(request)

      expect(getTokenSSRMock).toHaveBeenCalledWith('Authorization')
      expect(getTokenSSRMock).toHaveBeenCalledWith('Refresh')
      expect(refreshAccessToken).toHaveBeenCalledWith({
        refreshToken: 'ssr-refresh-token',
        accessKeyName: 'Authorization',
        refreshKeyName: 'Refresh',
      })
      expect(request.headers.Authorization).toBe('Bearer new-ssr-access-token')
    })

    it('should not use getTokenSSR when no auth is required in SSR', async () => {
      const { getTokenSSR } = require('../../../token/getTokenSSR')
      const getTokenSSRMock = getTokenSSR as jest.Mock
      getTokenSSRMock.mockResolvedValue('ssr-token')

      const {
        axios: {
          interceptors: {
            request: { use },
          },
        },
      } = createAxiosInstance({
        servicesWithoutToken: [/\/public-endpoint/],
      })

      const [[interceptorFn]] = (use as jest.Mock).mock.calls

      const request = {
        headers: { Authorization: undefined },
        url: '/public-endpoint',
      }

      await interceptorFn(request)

      expect(getTokenSSRMock).toHaveBeenCalled()
      expect(request.headers.Authorization).toBeUndefined()
    })

    it('should handle SSR token refresh failure by emitting logout event', async () => {
      const { getTokenSSR } = require('../../../token/getTokenSSR')
      const { isUserTokenValid } = require('../../../token/isUserTokenValid')
      const { refreshAccessToken } = require('../../../token/refreshAccessToken')
      const { eventEmitter } = require('../../../events')

      const getTokenSSRMock = getTokenSSR as jest.Mock
      getTokenSSRMock
        .mockResolvedValueOnce('invalid-access-token') // access token
        .mockResolvedValueOnce('ssr-refresh-token') // refresh token

      const isUserTokenValidMock = isUserTokenValid as jest.Mock
      isUserTokenValidMock.mockReturnValue(false)

      const refreshAccessTokenMock = refreshAccessToken as jest.Mock
      refreshAccessTokenMock.mockRejectedValue(new Error('Refresh failed'))

      const {
        axios: {
          interceptors: {
            request: { use },
          },
        },
      } = createAxiosInstance()

      const [[interceptorFn]] = (use as jest.Mock).mock.calls

      const request = {
        headers: { Authorization: undefined },
        url: 'someUrl',
      }

      await expect(interceptorFn(request)).rejects.toThrow('Refresh failed')

      expect(eventEmitter.emit).toHaveBeenCalledWith('logout')
    })

    it('should not attempt to refresh token if refreshToken is false in SSR', async () => {
      const { getTokenSSR } = require('../../../token/getTokenSSR')
      const { isUserTokenValid } = require('../../../token/isUserTokenValid')
      const { refreshAccessToken } = require('../../../token/refreshAccessToken')

      const getTokenSSRMock = getTokenSSR as jest.Mock
      getTokenSSRMock.mockResolvedValue('invalid-access-token')

      const isUserTokenValidMock = isUserTokenValid as jest.Mock
      isUserTokenValidMock.mockReturnValue(false)

      const refreshAccessTokenMock = refreshAccessToken as jest.Mock

      const {
        axios: {
          interceptors: {
            request: { use },
          },
        },
      } = createAxiosInstance({ refreshToken: false })

      const [[interceptorFn]] = (use as jest.Mock).mock.calls

      const request = {
        headers: { Authorization: undefined },
        url: 'someUrl',
      }

      await interceptorFn(request)

      expect(refreshAccessTokenMock).not.toHaveBeenCalled()
      expect(request.headers.Authorization).toBe('Bearer invalid-access-token')
    })
  })

  // TODO: add tests for response interceptor
  // - should decamelize response data by default
  // - should not decamelize response data if `decamelizeResponseData` is false
})
