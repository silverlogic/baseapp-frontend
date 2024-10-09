import _axios from 'axios'
import humps from 'humps'
import Cookies from 'js-cookie'

import { LANGUAGE_COOKIE_NAME } from '../../../constants/cookie'
import { LOGOUT_EVENT } from '../../../constants/events'
import { SERVICES_WITHOUT_TOKEN } from '../../../constants/fetch'
import { ACCESS_KEY_NAME, REFRESH_KEY_NAME } from '../../../constants/jwt'
import { eventEmitter } from '../../events'
import { buildQueryString } from '../../string'
import { decodeJWT, isUserTokenValid } from '../../token'
import { refreshAccessToken } from '../../token/refreshAccessToken'

export const createAxiosInstance = ({
  returnData = true,
  file = false,
  accessKeyName = ACCESS_KEY_NAME,
  refreshKeyName = REFRESH_KEY_NAME,
  languageCookieName = LANGUAGE_COOKIE_NAME,
  servicesWithoutToken = SERVICES_WITHOUT_TOKEN,
  useFormData = true,
  refreshToken = true,
  tokenType = 'Bearer',
} = {}) => {
  const instance = _axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    paramsSerializer(params: Record<string, any>) {
      return buildQueryString(params)
    },
  })

  const contentType = file ? 'multipart/form-data' : 'application/json'

  instance.defaults.headers.post['Content-Type'] = contentType
  instance.defaults.headers.patch['Content-Type'] = contentType
  instance.defaults.headers.put['Content-Type'] = contentType

  const requestInterceptorId = instance.interceptors.request.use(async (request) => {
    const isAuthTokenRequired = !servicesWithoutToken.some((regex) => regex.test(request.url || ''))
    let authToken = Cookies.get(accessKeyName)

    if (authToken && isAuthTokenRequired && refreshToken) {
      const isTokenValid = isUserTokenValid(decodeJWT(authToken))
      if (!isTokenValid) {
        try {
          authToken = await refreshAccessToken(accessKeyName, refreshKeyName)
        } catch (error) {
          if (eventEmitter.listenerCount(LOGOUT_EVENT)) {
            eventEmitter.emit(LOGOUT_EVENT)
          }
          return Promise.reject(error)
        }
      }
    }

    if (request.headers && !request.headers.Authorization && authToken && isAuthTokenRequired) {
      request.headers.Authorization = `${tokenType} ${authToken}`
    }

    const language = Cookies.get(languageCookieName)
    if (request.headers && language) {
      request.headers['Accept-Language'] = language
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
