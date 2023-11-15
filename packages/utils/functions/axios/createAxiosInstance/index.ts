import _axios, { AxiosRequestConfig } from 'axios'
import humps from 'humps'
import Cookies from 'js-cookie'

import { SERVICES_WITHOUT_TOKEN } from '../../../constants/axios'
import { ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME } from '../../../constants/cookie'
import { LOGOUT_EVENT } from '../../../constants/events'
import { TokenTypes } from '../../../constants/token'
import { IJWTResponse } from '../../../types/jwt'
import { eventEmitter } from '../../events'
import { buildQueryString } from '../../string'

const REFRESH_TOKEN_URL = '/auth/refresh'

export const createAxiosInstance = ({
  returnData = true,
  file = false,
  cookieName = ACCESS_COOKIE_NAME,
  refreshCookieName = REFRESH_COOKIE_NAME,
  servicesWithoutToken = SERVICES_WITHOUT_TOKEN,
  tokenType: instanceTokenType = TokenTypes.jwt,
} = {}) => {
  const instance = _axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    paramsSerializer(params: Record<string, any>) {
      return buildQueryString(params)
    },
  })

  const contentType = file ? 'multipart/form-data' : 'application/json'
  const tokenType = process.env.NEXT_PUBLIC_TOKEN_TYPE ?? instanceTokenType

  instance.defaults.headers.post['Content-Type'] = contentType
  instance.defaults.headers.patch['Content-Type'] = contentType
  instance.defaults.headers.put['Content-Type'] = contentType

  const requestInterceptorId = instance.interceptors.request.use(async (request) => {
    const authToken = Cookies.get(cookieName)

    if (authToken) {
      if (
        request.headers &&
        !request.headers.Authorization &&
        !servicesWithoutToken.some((regex) => regex.test(request.url || ''))
      ) {
        request.headers.Authorization =
          tokenType === TokenTypes.jwt ? `Bearer ${authToken}` : `Token ${authToken}`
      }
    }

    if (request.data && !file) {
      request.data = JSON.stringify(humps.decamelizeKeys(request.data))
    }

    if (request.params) {
      request.params = humps.decamelizeKeys(request.params)
    }

    return request
  })

  const responseInterceptorId = instance.interceptors.response.use(
    (response) => {
      if (response.data && response.headers?.['content-type'] === 'application/json') {
        response.data = humps.camelizeKeys(response.data)
      }
      return returnData && response.data ? response.data : response
    },
    async (error) => {
      if (
        tokenType === TokenTypes.jwt &&
        error.response?.status === 401 &&
        error.config.url !== REFRESH_TOKEN_URL
      ) {
        try {
          const originalRequest = error.config
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          return await refreshAccessToken(cookieName, refreshCookieName, originalRequest)
        } catch (refreshError) {
          if (eventEmitter.listenerCount(LOGOUT_EVENT)) {
            eventEmitter.emit(LOGOUT_EVENT)
          }
        }
      }

      if (error.response.data && error.response.headers?.['content-type'] === 'application/json') {
        const newError = { response: { data: {} } }
        newError.response.data = humps.camelizeKeys(error.response.data)
      }
      return Promise.reject(error)
    },
  )

  return { axios: instance, requestInterceptorId, responseInterceptorId }
}

// we export the interceptors ids so it can easily ejected if needed
export const { axios, requestInterceptorId, responseInterceptorId } = createAxiosInstance()

export const {
  axios: axiosForFiles,
  requestInterceptorId: requestInterceptorIdForFiles,
  responseInterceptorId: responseInterceptorIdForFiles,
} = createAxiosInstance({ file: true })

// TODO: move this function to a separate file (we can't do it now because of a circular dependency)
export const refreshAccessToken = async (
  cookieName: string,
  refreshCookieName: string,
  originalRequest: AxiosRequestConfig,
) => {
  const refreshToken = Cookies.get(refreshCookieName)

  if (!refreshToken) {
    return Promise.reject(new Error('No refresh token'))
  }

  try {
    const response = (await axios.post(REFRESH_TOKEN_URL, {
      refresh: refreshToken,
    })) as IJWTResponse

    Cookies.set(cookieName, response.access, {
      secure: process.env.NODE_ENV === 'production',
    })

    if (originalRequest.headers) {
      // eslint-disable-next-line no-param-reassign
      originalRequest.headers.Authorization = `Bearer ${response.access}`
    }

    return await axios(originalRequest)
  } catch (error) {
    Cookies.remove(cookieName)
    Cookies.remove(refreshCookieName)

    return Promise.reject(error)
  }
}
