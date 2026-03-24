import humps from 'humps'

import { createAxiosInstance } from '..'
import { awaitSessionRecovery } from '../../../auth/awaitSessionRecovery'

var mockRequest = jest.fn()

jest.mock('humps', () => ({
  decamelize: jest.fn().mockImplementation((key) => key.replace(/([A-Z])/g, '_$1').toLowerCase()),
  decamelizeKeys: jest.fn().mockImplementation((keys) => keys),
  camelizeKeys: jest.fn().mockImplementation((keys) => keys),
}))
jest.mock('axios', () => ({
  ...jest.requireActual('axios'),
  create: () => ({
    defaults: jest.requireActual('axios').create().defaults,
    request: mockRequest,
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
jest.mock('../../../token/getToken', () => ({
  getToken: jest.fn().mockReturnValue('someAuthToken'),
}))
jest.mock('../../../token/getTokenSSR', () => ({
  getTokenSSR: jest.fn().mockResolvedValue('someAuthToken'),
}))
jest.mock('../../../auth/awaitSessionRecovery', () => ({
  awaitSessionRecovery: jest.fn().mockResolvedValue('cleared'),
}))

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

  describe('stateless transport', () => {
    it('should not decode tokens or call refresh in the request interceptor', async () => {
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

      const result = await interceptorFn(request)

      expect(result.headers.Authorization).toBe('Bearer someAuthToken')
    })

    it('should call awaitSessionRecovery on 401 response in response interceptor', async () => {
      const awaitSessionRecoveryMock = awaitSessionRecovery as jest.Mock
      awaitSessionRecoveryMock.mockResolvedValue('cleared')

      const {
        axios: {
          interceptors: {
            response: { use },
          },
        },
      } = createAxiosInstance()

      const [[, errorHandler]] = (use as jest.Mock).mock.calls

      const error = {
        response: {
          status: 401,
          headers: { 'content-type': 'application/json' },
          data: { detail: 'Unauthorized' },
        },
        config: { url: '/api/test', headers: {} },
      }

      await expect(errorHandler(error)).rejects.toBeDefined()

      expect(awaitSessionRecoveryMock).toHaveBeenCalledWith(
        expect.objectContaining({
          source: 'axios',
          path: '/api/test',
          status: 401,
        }),
      )
    })

    it('should not call awaitSessionRecovery on non-401 errors', async () => {
      const awaitSessionRecoveryMock = awaitSessionRecovery as jest.Mock
      awaitSessionRecoveryMock.mockClear()

      const {
        axios: {
          interceptors: {
            response: { use },
          },
        },
      } = createAxiosInstance()

      const [[, errorHandler]] = (use as jest.Mock).mock.calls

      const error = {
        response: {
          status: 403,
          headers: { 'content-type': 'application/json' },
          data: { detail: 'Forbidden' },
        },
        config: { url: '/api/test', headers: {} },
      }

      await expect(errorHandler(error)).rejects.toBeDefined()

      expect(awaitSessionRecoveryMock).not.toHaveBeenCalled()
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
      expect(request.headers.Authorization).toBe('Bearer ssr-access-token')
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
  })

  describe('401 retry-once flow', () => {
    it('should retry once and return data when refresh resolves as refreshed', async () => {
      const awaitSessionRecoveryMock = awaitSessionRecovery as jest.Mock
      awaitSessionRecoveryMock.mockResolvedValue('refreshed')

      const { getToken } = require('../../../token/getToken')
      ;(getToken as jest.Mock).mockReturnValue('new-refreshed-token')

      mockRequest.mockResolvedValue({ data: 'retried-success' })

      const {
        axios: {
          interceptors: {
            response: { use },
          },
        },
      } = createAxiosInstance()

      const [[, errorHandler]] = (use as jest.Mock).mock.calls

      const error = {
        response: {
          status: 401,
          headers: { 'content-type': 'application/json' },
          data: { detail: 'Unauthorized' },
        },
        config: { url: '/api/test', headers: {} },
      }

      const result = await errorHandler(error)

      expect(awaitSessionRecoveryMock).toHaveBeenCalledTimes(1)
      expect(mockRequest).toHaveBeenCalledWith(
        expect.objectContaining({
          authRecoveryRetried: true,
          headers: expect.objectContaining({
            Authorization: 'Bearer new-refreshed-token',
          }),
        }),
      )
      expect(result).toEqual({ data: 'retried-success' })
    })

    it('should reject when refresh resolves as cleared', async () => {
      const awaitSessionRecoveryMock = awaitSessionRecovery as jest.Mock
      awaitSessionRecoveryMock.mockResolvedValue('cleared')

      const {
        axios: {
          interceptors: {
            response: { use },
          },
        },
      } = createAxiosInstance()

      const [[, errorHandler]] = (use as jest.Mock).mock.calls

      const error = {
        response: {
          status: 401,
          headers: { 'content-type': 'application/json' },
          data: { detail: 'Unauthorized' },
        },
        config: { url: '/api/test', headers: {} },
      }

      await expect(errorHandler(error)).rejects.toBeDefined()

      expect(awaitSessionRecoveryMock).toHaveBeenCalledTimes(1)
      expect(mockRequest).not.toHaveBeenCalled()
    })

    it('should not retry a second time if authRecoveryRetried is already true', async () => {
      const awaitSessionRecoveryMock = awaitSessionRecovery as jest.Mock
      awaitSessionRecoveryMock.mockClear()

      const {
        axios: {
          interceptors: {
            response: { use },
          },
        },
      } = createAxiosInstance()

      const [[, errorHandler]] = (use as jest.Mock).mock.calls

      const error = {
        response: {
          status: 401,
          headers: { 'content-type': 'application/json' },
          data: { detail: 'Unauthorized' },
        },
        config: { url: '/api/test', headers: {}, authRecoveryRetried: true },
      }

      await expect(errorHandler(error)).rejects.toBeDefined()

      expect(awaitSessionRecoveryMock).not.toHaveBeenCalled()
      expect(mockRequest).not.toHaveBeenCalled()
    })

    it('should not call awaitSessionRecovery for non-auth-required paths on 401', async () => {
      const awaitSessionRecoveryMock = awaitSessionRecovery as jest.Mock
      awaitSessionRecoveryMock.mockClear()

      const {
        axios: {
          interceptors: {
            response: { use },
          },
        },
      } = createAxiosInstance({
        servicesWithoutToken: [/\/public/],
      })

      const [[, errorHandler]] = (use as jest.Mock).mock.calls

      const error = {
        response: {
          status: 401,
          headers: { 'content-type': 'application/json' },
          data: { detail: 'Unauthorized' },
        },
        config: { url: '/public/endpoint', headers: {} },
      }

      await expect(errorHandler(error)).rejects.toBeDefined()

      expect(awaitSessionRecoveryMock).not.toHaveBeenCalled()
    })
  })

  // TODO: add tests for response interceptor
  // - should decamelize response data by default
  // - should not decamelize response data if `decamelizeResponseData` is false
})
