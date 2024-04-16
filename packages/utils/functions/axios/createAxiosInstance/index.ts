import _axios from 'axios'
import humps from 'humps'
import Cookies from 'js-cookie'

import { ACCESS_COOKIE_NAME, REFRESH_COOKIE_NAME } from '../../../constants/cookie'
import { LOGOUT_EVENT } from '../../../constants/events'
import { SERVICES_WITHOUT_TOKEN } from '../../../constants/fetch'
import { TokenTypes } from '../../../constants/token'
import { eventEmitter } from '../../events'
import { buildQueryString } from '../../string'
import { decodeJWT, isUserTokenValid } from '../../token'
import { refreshAccessToken } from '../../token/refreshAccessToken'

export const createAxiosInstance = ({
  returnData = true,
  file = false,
  cookieName = ACCESS_COOKIE_NAME,
  refreshCookieName = REFRESH_COOKIE_NAME,
  servicesWithoutToken = SERVICES_WITHOUT_TOKEN,
  tokenType: instanceTokenType = TokenTypes.jwt,
  useFormData = true,
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
    const isAuthTokenRequired = !servicesWithoutToken.some((regex) => regex.test(request.url || ''))
    let authToken = Cookies.get(cookieName)

    if (authToken && isAuthTokenRequired && tokenType === TokenTypes.jwt) {
      const isTokenValid = isUserTokenValid(decodeJWT(authToken))
      if (!isTokenValid) {
        try {
          authToken = await refreshAccessToken(cookieName, refreshCookieName)
        } catch (error) {
          if (eventEmitter.listenerCount(LOGOUT_EVENT)) {
            eventEmitter.emit(LOGOUT_EVENT)
          }
          return Promise.reject(error)
        }
      }
    }

    if (request.headers && !request.headers.Authorization && authToken && isAuthTokenRequired) {
      request.headers.Authorization =
        tokenType === TokenTypes.jwt ? `Bearer ${authToken}` : `Token ${authToken}`
    }

    if (request.data && !file) {
      request.data = JSON.stringify(humps.decamelizeKeys(request.data))
    }
    if (request.data && file && useFormData) {
      const formData = new FormData()
      Object.entries(request.data).forEach(([key, value]) => {
        const decamelizedKey = humps.decamelize(key)
        if (!value) return
        if (value instanceof File) {
          formData.append(decamelizedKey, value)
        } else if (typeof value === 'object') {
          formData.append(decamelizedKey, JSON.stringify(value))
        } else {
          formData.append(decamelizedKey, value?.toString())
        }
      })
      request.data = formData
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
        error.response?.data &&
        error.response?.headers?.['content-type'] === 'application/json'
      ) {
        const newError = { response: { data: {} } }
        newError.response.data = humps.camelizeKeys(error.response.data)

        return Promise.reject(newError)
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
