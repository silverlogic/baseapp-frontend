import humps from 'humps'
import type { Mock } from 'vitest'

import { createAxiosInstance } from '..'
import { broadcastEvent } from '../../../events'
import { getTokenSSR } from '../../../token/getTokenSSR'
import { isUserTokenValid } from '../../../token/isUserTokenValid'
import { refreshAccessToken } from '../../../token/refreshAccessToken'

vi.mock('humps', async () => {
  const fns = {
    decamelize: vi.fn().mockImplementation((key) => key.replace(/([A-Z])/g, '_$1').toLowerCase()),
    decamelizeKeys: vi.fn().mockImplementation((keys) => keys),
    camelizeKeys: vi.fn().mockImplementation((keys) => keys),
  }
  return { ...fns, default: fns }
})
vi.mock('axios', async () => {
  const actual = await vi.importActual<any>('axios')
  const realAxios = actual.default ?? actual
  const mockedAxios = {
    ...realAxios,
    create: () => {
      const inst = realAxios.create()
      return {
        defaults: inst.defaults,
        interceptors: {
          ...inst.interceptors,
          request: { eject: vi.fn(), use: vi.fn() },
          response: { eject: vi.fn(), use: vi.fn() },
        },
      }
    },
  }
  return { ...actual, default: mockedAxios }
})
vi.mock('js-cookie', async () => ({
  ...(await vi.importActual('js-cookie')),
  get: () => 'someLanguage',
}))
vi.mock('../../../token/decodeJWT', async () => ({
  decodeJWT: vi.fn(() => ({ exp: 1234567890 })),
}))
vi.mock('../../../token/isUserTokenValid', async () => ({
  isUserTokenValid: vi.fn(() => true),
}))
vi.mock('../../../token/refreshAccessToken', async () => ({
  refreshAccessToken: vi.fn().mockResolvedValue('refreshedAuthToken'),
}))
vi.mock('../../../token/getToken', async () => ({
  getToken: vi.fn().mockReturnValue('someAuthToken'),
}))
vi.mock('../../../token/getTokenSSR', async () => ({
  getTokenSSR: vi.fn().mockResolvedValue('someAuthToken'),
}))
vi.mock('../../../events', async () => ({
  broadcastEvent: vi.fn(),
}))

// Mock the global window object
Object.defineProperty(global, 'window', {
  value: {},
  writable: true,
})

describe('createAxiosInstance', () => {
  afterEach(() => {
    vi.clearAllMocks()
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

    const [[interceptorFn]] = (use as Mock).mock.calls as any

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

    const [[interceptorFn]] = (use as Mock).mock.calls as any
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

    const [[interceptorFn]] = (use as Mock).mock.calls as any

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

    const [[interceptorFn]] = (use as Mock).mock.calls as any

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

    const [[interceptorFn]] = (use as Mock).mock.calls as any

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

    const [[interceptorFn]] = (use as Mock).mock.calls as any

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

    const [[interceptorFn]] = (use as Mock).mock.calls as any

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

    const [[interceptorFn]] = (use as Mock).mock.calls as any

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

    const [[interceptorFn]] = (use as Mock).mock.calls as any

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
      const getTokenSSRMock = getTokenSSR as Mock
      getTokenSSRMock.mockResolvedValue('ssr-access-token')

      const {
        axios: {
          interceptors: {
            request: { use },
          },
        },
      } = createAxiosInstance()

      const [[interceptorFn]] = (use as Mock).mock.calls as any

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
      const getTokenSSRMock = getTokenSSR as Mock
      getTokenSSRMock
        .mockResolvedValueOnce('invalid-access-token') // access token
        .mockResolvedValueOnce('ssr-refresh-token') // refresh token

      const isUserTokenValidMock = isUserTokenValid as Mock
      isUserTokenValidMock.mockReturnValue(false)

      const refreshAccessTokenMock = refreshAccessToken as Mock
      refreshAccessTokenMock.mockResolvedValue('new-ssr-access-token')

      const {
        axios: {
          interceptors: {
            request: { use },
          },
        },
      } = createAxiosInstance()

      const [[interceptorFn]] = (use as Mock).mock.calls as any

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
      const getTokenSSRMock = getTokenSSR as Mock
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

      const [[interceptorFn]] = (use as Mock).mock.calls as any

      const request = {
        headers: { Authorization: undefined },
        url: '/public-endpoint',
      }

      await interceptorFn(request)

      expect(getTokenSSRMock).toHaveBeenCalled()
      expect(request.headers.Authorization).toBeUndefined()
    })

    it('should handle SSR token refresh failure by emitting logout event', async () => {
      const getTokenSSRMock = getTokenSSR as Mock
      getTokenSSRMock
        .mockResolvedValueOnce('invalid-access-token') // access token
        .mockResolvedValueOnce('ssr-refresh-token') // refresh token

      const isUserTokenValidMock = isUserTokenValid as Mock
      isUserTokenValidMock.mockReturnValue(false)

      const refreshAccessTokenMock = refreshAccessToken as Mock
      refreshAccessTokenMock.mockRejectedValue(new Error('Refresh failed'))

      const {
        axios: {
          interceptors: {
            request: { use },
          },
        },
      } = createAxiosInstance()

      const [[interceptorFn]] = (use as Mock).mock.calls as any

      const request = {
        headers: { Authorization: undefined },
        url: 'someUrl',
      }

      await expect(interceptorFn(request)).rejects.toThrow('Refresh failed')

      expect(broadcastEvent).toHaveBeenCalledWith('logout')
    })

    it('should not attempt to refresh token if refreshToken is false in SSR', async () => {
      const getTokenSSRMock = getTokenSSR as Mock
      getTokenSSRMock.mockResolvedValue('invalid-access-token')

      const isUserTokenValidMock = isUserTokenValid as Mock
      isUserTokenValidMock.mockReturnValue(false)

      const refreshAccessTokenMock = refreshAccessToken as Mock

      const {
        axios: {
          interceptors: {
            request: { use },
          },
        },
      } = createAxiosInstance({ refreshToken: false })

      const [[interceptorFn]] = (use as Mock).mock.calls as any

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
