import _axios from 'axios'
import humps from 'humps'
import Cookies from 'js-cookie'

import { LANGUAGE_COOKIE_NAME } from '../../../constants/cookie'
import { LOGOUT_EVENT } from '../../../constants/events'
import { SERVICES_WITHOUT_TOKEN } from '../../../constants/fetch'
import { ACCESS_KEY_NAME, REFRESH_KEY_NAME } from '../../../constants/jwt'
import { eventEmitter } from '../../events'
import { getExpoConstant } from '../../expo'
import { buildQueryString } from '../../string'
import { decodeJWT } from '../../token/decodeJWT'
import { isUserTokenValid } from '../../token/isUserTokenValid'
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
  decamelizeRequestBodyKeys = true,
  decamelizeRequestParamsKeys = true,
  camelizeResponseDataKeys = true,
  stringifyBody = true,
  setContentType = true,
  baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL,
} = {}) => {
  const EXPO_PUBLIC_API_BASE_URL = getExpoConstant('EXPO_PUBLIC_API_BASE_URL')

  const instance = _axios.create({
    baseURL: baseUrl ?? EXPO_PUBLIC_API_BASE_URL,
    paramsSerializer(params: Record<string, any>) {
      return buildQueryString(params)
    },
  })

  if (setContentType) {
    const contentType = file ? 'multipart/form-data' : 'application/json'
    instance.defaults.headers.post['Content-Type'] = contentType
    instance.defaults.headers.patch['Content-Type'] = contentType
    instance.defaults.headers.put['Content-Type'] = contentType
  }

  const requestInterceptorId = instance.interceptors.request.use(async (request) => {
    const isAuthTokenRequired = !servicesWithoutToken.some((regex) => regex.test(request.url || ''))
    // token refresh logic
    let accessAuthToken
    let refreshAuthToken
    // TODO: maybe find a better way to deal with RSC
    if (typeof window === typeof undefined) {
      const { getTokenSSR } = await import('../../token/getTokenSSR')
      accessAuthToken = await getTokenSSR(accessKeyName)
      refreshAuthToken = await getTokenSSR(refreshKeyName)
    } else {
      const { getToken } = await import('../../token/getToken')
      accessAuthToken = getToken(accessKeyName)
      refreshAuthToken = getToken(refreshKeyName)
    }

    if (accessAuthToken && isAuthTokenRequired && refreshToken) {
      const isTokenValid = isUserTokenValid(decodeJWT(accessAuthToken))
      if (!isTokenValid) {
        try {
          accessAuthToken = await refreshAccessToken({
            refreshToken: refreshAuthToken,
            accessKeyName,
            refreshKeyName,
          })
        } catch (error) {
          if (eventEmitter.listenerCount(LOGOUT_EVENT)) {
            eventEmitter.emit(LOGOUT_EVENT)
          }
          return Promise.reject(error)
        }
      }
    }

    if (
      request.headers &&
      !request.headers.Authorization &&
      accessAuthToken &&
      isAuthTokenRequired
    ) {
      request.headers.Authorization = `${tokenType} ${accessAuthToken}`
    }

    const language = Cookies.get(languageCookieName)
    if (request.headers && language) {
      request.headers['Accept-Language'] = language
    }

    if (request.data) {
      if (!file || !useFormData) {
        if (stringifyBody) {
          if (decamelizeRequestBodyKeys) {
            request.data = JSON.stringify(humps.decamelizeKeys(request.data))
          } else {
            request.data = JSON.stringify(request.data)
          }
        } else if (decamelizeRequestBodyKeys) {
          request.data = humps.decamelizeKeys(request.data)
        }
      } else if (file && useFormData) {
        const formData = new FormData()
        Object.entries(request.data).forEach(([key, value]) => {
          const decamelizedKey = humps.decamelize(key)
          if (!value) return
          if (value instanceof File) {
            formData.append(decamelizedKey, value)
          } else if (typeof value === 'object') {
            formData.append(decamelizedKey, JSON.stringify(value))
          } else {
            formData.append(decamelizedKey, value.toString())
          }
        })
        request.data = formData
      }
    }

    if (request.params && decamelizeRequestParamsKeys) {
      request.params = humps.decamelizeKeys(request.params)
    }

    return request
  })

  const responseInterceptorId = instance.interceptors.response.use(
    (response) => {
      const contentTypeHeader = response.headers?.['content-type'] || ''
      const isJsonResponse = contentTypeHeader.includes('application/json')

      if (isJsonResponse && response.data && camelizeResponseDataKeys) {
        response.data = humps.camelizeKeys(response.data)
      }
      return returnData && response.data ? response.data : response
    },
    (error) => {
      const contentTypeHeader = error.response?.headers?.['content-type'] || ''
      const isJsonError = contentTypeHeader.includes('application/json')

      if (isJsonError && error.response?.data) {
        const newError = { response: { data: {} } }
        newError.response.data = camelizeResponseDataKeys
          ? humps.camelizeKeys(error.response.data)
          : error.response.data

        return Promise.reject(newError)
      }

      return Promise.reject(error)
    },
  )

  return { axios: instance, requestInterceptorId, responseInterceptorId }
}

export const { axios, requestInterceptorId, responseInterceptorId } = createAxiosInstance()

export const {
  axios: axiosForFiles,
  requestInterceptorId: requestInterceptorIdForFiles,
  responseInterceptorId: responseInterceptorIdForFiles,
} = createAxiosInstance({ file: true })
