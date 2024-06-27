import _axios from 'axios'
import humps from 'humps'
import Cookies from 'js-cookie'

import { buildQueryString } from './queryString'

function createAxiosInstance({ file = false, languageCookieName = 'Language' } = {}) {
  const instance = _axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    paramsSerializer(params) {
      return buildQueryString(params)
    },
  })

  const contentType = file ? 'multipart/form-data' : 'application/json'

  instance.defaults.headers.post['Content-Type'] = contentType
  instance.defaults.headers.patch['Content-Type'] = contentType
  instance.defaults.headers.put['Content-Type'] = contentType

  instance.interceptors.request.use((request) => {
    const authToken = Cookies.get('Authorization')
    if (authToken) {
      if (request.headers && !request.headers.Authorization) {
        request.headers.Authorization = `Token ${authToken}`
      }
    }

    const language = Cookies.get(languageCookieName)
    if (language) {
      if (request.headers) {
        request.headers['Accept-Language'] = language
      }
    }

    if (request.data && !file) {
      request.data = JSON.stringify(humps.decamelizeKeys(request.data))
    }

    return request
  })

  instance.interceptors.response.use(
    (response) => {
      if (response.data && response.headers?.['content-type'] === 'application/json') {
        response.data = humps.camelizeKeys(response.data)
      }
      return response
    },
    (error) => {
      if (error.response.data && error.response.headers?.['content-type'] === 'application/json') {
        const newError = { response: { data: {} } }
        newError.response.data = humps.camelizeKeys(error.response.data)
      }
      return Promise.reject(error)
    },
  )

  return instance
}

export const axios = createAxiosInstance()

export const axiosForFiles = createAxiosInstance({ file: true })
