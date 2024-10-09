import humps from 'humps'

import { LANGUAGE_COOKIE_NAME } from '../../../constants/cookie'
import { LOGOUT_EVENT } from '../../../constants/events'
import { SERVICES_WITHOUT_TOKEN } from '../../../constants/fetch'
import { ACCESS_KEY_NAME, REFRESH_KEY_NAME } from '../../../constants/jwt'
import { eventEmitter } from '../../events'
import { getLanguage } from '../../language/getLanguage'
import { buildQueryString } from '../../string'
import { decodeJWT, getToken, isUserTokenValid, refreshAccessToken } from '../../token'
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
    baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.EXPO_PUBLIC_API_BASE_URL,
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
  const url = `${baseUrl}${path}`
  const isAuthTokenRequired = !servicesWithoutToken.some((regex) => regex.test(path || ''))

  const fetchOptions: RequestOptions = {
    ...options,
    headers: {
      Accept: 'application/json',
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
  let authToken = getToken(accessKeyName, { noSSR: false })

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

  // set Authorization header
  if (authToken && isAuthTokenRequired) {
    fetchOptions.headers!.Authorization = `${tokenType} ${authToken}`
  }

  // set language header
  const language = getLanguage(languageCookieName, { noSSR: false })
  if (language) {
    fetchOptions.headers!['Accept-Language'] = language
  }

  // set content-type header
  const methodsToSetContentType = ['POST', 'PUT', 'PATCH']
  if (setContentType && methodsToSetContentType.includes(fetchOptions.method || '')) {
    fetchOptions.headers!['Content-Type'] = 'application/json'
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
      const data = await response.json()

      // camelize response data
      return camelizeResponseDataKeys ? humps.camelizeKeys(data) : data
    }

    return response
  } catch (error) {
    return Promise.reject(error)
  }
}
