import _axios from 'axios'
import humps from 'humps'
import Cookies from 'js-cookie'

import { SERVICES_WITHOUT_TOKEN } from '../../../constants/axios'
import { COOKIE_NAME } from '../../../constants/cookie'
import { buildQueryString } from '../../string'

export const createAxiosInstance = ({
  returnData = true,
  file = false,
  cookieName = COOKIE_NAME,
  servicesWithoutToken = SERVICES_WITHOUT_TOKEN,
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

  const requestInterceptorId = instance.interceptors.request.use((request) => {
    const authToken = Cookies.get(cookieName)
    if (authToken) {
      if (
        request.headers &&
        !request.headers.Authorization &&
        !servicesWithoutToken.includes(request.url || '')
      ) {
        request.headers.Authorization = `Token ${authToken}`
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
    (error) => {
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
