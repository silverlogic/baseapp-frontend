import humps from 'humps'

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
import { BaseAppFetch, RequestOptions } from './types'

/**
 *
 * Fetch function that handles token refresh and other common use cases.
 *
 * @description
 * This is a **BaseApp** feature.
 *
 * If you believe your changes should be in the BaseApp, please read the **CONTRIBUTING.md** guide.
 *
 * @example Fetching data with params
 * ```ts
 * const data = await baseAppFetch('/users', {
 *            params: {
 *            search: 'John Doe',
 *            },
 *          })
 * ```
 *
 * @example Fetching data with a POST request
 * ```ts
 * const data = await baseAppFetch('/users', {
 *            method: 'POST',
 *            body: {
 *              firstName: 'John',
 *              lastName: 'Doe',
 *            },
 *          })
 * ```
 *
 * @example Turning off common utilities
 * ```ts
 * const data = await baseAppFetch('/users', {
 *            decamelizeRequestBodyKeys: false,
 *            decamelizeRequestParamsKeys: false,
 *            camelizeResponseDataKeys: false,
 *            stringifyBody: false,
 *            setContentType: false,
 *          })
 * ```
 *
 * @example Altering defaults
 *
 * Consider creating an instance of `baseAppFetch` with your custom defaults to reuse, so you don't have to pass them every time.
 *
 * ```ts
 * export const customBaseAppFetch = (props: BaseAppFetchOptions) => baseAppFetch('/not/authenticated/api/route', {
 *            baseUrl: 'https://another.api.io',
 *            servicesWithoutToken: [/^\/not\/authenticated\/api\/route/, /\/another\/public\/route/],
 *            accessKeyName: "My Custom Access Cookie",
 *            refreshKeyName: "My Custom Refresh Cookie",
 *            ...props,
 *          })
 * ```
 */
export const baseAppFetch: BaseAppFetch = async (
  path,
  {
    accessKeyName = ACCESS_KEY_NAME,
    refreshKeyName = REFRESH_KEY_NAME,
    languageCookieName = LANGUAGE_COOKIE_NAME,
    baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL,
    servicesWithoutToken = SERVICES_WITHOUT_TOKEN,
    params = {},
    decamelizeRequestBodyKeys = true,
    decamelizeRequestParamsKeys = true,
    camelizeResponseDataKeys = true,
    stringifyBody = true,
    setContentType = true,
    throwError = true,
    refreshToken = true,
    tokenType = 'Bearer',
    ...options
  } = {},
) => {
  const EXPO_PUBLIC_API_BASE_URL = getExpoConstant('EXPO_PUBLIC_API_BASE_URL')

  const url = `${baseUrl ?? EXPO_PUBLIC_API_BASE_URL}${path}`
  const isAuthTokenRequired = !servicesWithoutToken.some((regex) => regex.test(path || ''))

  const fetchOptions: RequestOptions = {
    ...options,
    headers: {
      Accept: 'application/json, text/plain, */*',
      ...options.headers,
    },
  }

  // stringify and decamelize request body
  if (options.body && stringifyBody) {
    const bodyStringify = decamelizeRequestBodyKeys
      ? JSON.stringify(humps.decamelizeKeys(options.body))
      : JSON.stringify(options.body)

    fetchOptions.body = bodyStringify
  }

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

  // set Authorization header
  if (accessAuthToken && isAuthTokenRequired) {
    fetchOptions.headers!.Authorization = `${tokenType} ${accessAuthToken}`
  }

  // set language header
  // TODO: maybe find a better way to deal with RSC
  let language
  if (typeof window === typeof undefined) {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    language = cookieStore.get(languageCookieName)?.value
  } else {
    const { getLanguage } = await import('../../language/getLanguage')
    language = getLanguage(languageCookieName)
  }
  if (language) {
    fetchOptions.headers!['Accept-Language'] = language
  }

  // set content-type header
  const methodsToSetContentType = ['POST', 'PUT', 'PATCH']
  if (setContentType && methodsToSetContentType.includes(fetchOptions.method || '')) {
    fetchOptions.headers!['Content-Type'] = 'application/json; charset=utf-8'
  }

  let fetchUrl = url

  if (Object.keys(params).length > 0) {
    // decamelize request params
    const decamelizedParams = decamelizeRequestParamsKeys ? humps.decamelizeKeys(params) : params

    const queryString = buildQueryString(decamelizedParams)
    fetchUrl = `${url}?${queryString}`
  }

  try {
    // had to override the fetchOptions type because of the GraphQLBody type
    const response = await fetch(fetchUrl, fetchOptions as RequestInit)

    const isJsonResponse = response.headers.get('content-type')?.includes('application/json')

    if (!response.ok && throwError) {
      const errorMessage = isJsonResponse ? await response.json() : response.statusText
      throw new Error(JSON.stringify(errorMessage))
    }

    if (isJsonResponse) {
      const text = await response.text()

      // If the body is empty, return null
      if (!text || text.trim() === '') {
        return null
      }

      // Parse as JSON only if not empty
      const data = JSON.parse(text)

      // Protect against empty object {}
      if (data && Object.keys(data).length === 0 && data.constructor === Object) {
        return null
      }

      // camelize response data
      return camelizeResponseDataKeys ? humps.camelizeKeys(data) : data
    }

    return response
  } catch (error) {
    return Promise.reject(error)
  }
}
