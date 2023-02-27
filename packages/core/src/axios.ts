import _axios from 'axios'
import humps from 'humps'
import Cookies from 'js-cookie'

import { buildQueryString } from './queryString'

function createAxiosInstance(file = false) {
  const instance = _axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    paramsSerializer(params) {
      return buildQueryString(params)
    },
  })

  if (!file) {
    instance.defaults.headers.post['Content-Type'] = 'application/json'
    instance.defaults.headers.patch['Content-Type'] = 'application/json'
    instance.defaults.headers.put['Content-Type'] = 'application/json'
  } else {
    instance.defaults.headers.post['Content-Type'] = 'multipart/form-data'
    instance.defaults.headers.patch['Content-Type'] = 'multipart/form-data'
    instance.defaults.headers.put['Content-Type'] = 'multipart/form-data'
  }

  instance.interceptors.request.use((request) => {
    const authToken = Cookies.get('Authorization')
    if (authToken) {
      if (request.headers && !request.headers.Authorization) {
        request.headers.Authorization = `Token ${authToken}`
      }
    }

    if (request.data && !file) {
      request.data = JSON.stringify(humps.decamelizeKeys(request.data))
    }

    return request
  })

  instance.interceptors.response.use((response) => {
    if (response.data && response.headers?.['content-type'] === 'application/json') {
      response.data = humps.camelizeKeys(response.data)
    }
    return response
  })

  return instance
}

export const axios = createAxiosInstance()

export const axiosForFiles = createAxiosInstance(true)
