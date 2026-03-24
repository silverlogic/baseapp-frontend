import humps from 'humps'

import { LANGUAGE_COOKIE_NAME } from '../../../constants/cookie'
import { SERVICES_WITHOUT_TOKEN } from '../../../constants/fetch'
import { ACCESS_KEY_NAME, REFRESH_KEY_NAME } from '../../../constants/jwt'
import { CURRENT_PROFILE_KEY_NAME } from '../../../constants/profile'
import { MinimalProfile } from '../../../types/profile'
import { awaitSessionRecovery } from '../../auth/awaitSessionRecovery'
import { getExpoConstant } from '../../expo'
import { buildQueryString, parseString } from '../../string'
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
    accessTokenOverride,
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
    tokenType = 'Bearer',
    ...options
  } = {},
) => {
  const EXPO_PUBLIC_API_BASE_URL = getExpoConstant('EXPO_PUBLIC_API_BASE_URL')
  const isServer = typeof window === typeof undefined
  const url = `${baseUrl ?? EXPO_PUBLIC_API_BASE_URL}${path}`
  const isAuthTokenRequired = !servicesWithoutToken.some((regex) => regex.test(path || ''))

  let fetchUrl = url

  if (Object.keys(params).length > 0) {
    // decamelize request params
    const decamelizedParams = decamelizeRequestParamsKeys ? humps.decamelizeKeys(params) : params

    const queryString = buildQueryString(decamelizedParams)
    fetchUrl = `${url}?${queryString}`
  }

  async function executeRequest(hasRetried = false): Promise<any> {
    let currentProfile
    if (isServer) {
      const { getTokenSSR } = await import('../../token/getTokenSSR')
      currentProfile = await getTokenSSR(CURRENT_PROFILE_KEY_NAME)
    } else {
      const { getToken } = await import('../../token/getToken')
      currentProfile = getToken(CURRENT_PROFILE_KEY_NAME)
    }

    const parsedCurrentProfile = parseString<MinimalProfile>(currentProfile ?? undefined)

    const fetchOptions: RequestOptions = {
      ...options,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Current-Profile': parsedCurrentProfile ? parsedCurrentProfile.id : '',
        ...options.headers,
      },
    }

    if (options.body && stringifyBody) {
      const bodyStringify = decamelizeRequestBodyKeys
        ? JSON.stringify(humps.decamelizeKeys(options.body))
        : JSON.stringify(options.body)

      fetchOptions.body = bodyStringify
    }

    let accessAuthToken
    let refreshAuthToken
    if (isServer) {
      const { getTokenSSR } = await import('../../token/getTokenSSR')
      accessAuthToken = await getTokenSSR(accessKeyName)
      refreshAuthToken = await getTokenSSR(refreshKeyName)
    } else {
      const { getToken } = await import('../../token/getToken')
      accessAuthToken = getToken(accessKeyName)
      refreshAuthToken = getToken(refreshKeyName)
    }

    const resolvedAccessToken = accessTokenOverride ?? accessAuthToken

    if (!fetchOptions.headers?.Authorization && resolvedAccessToken && isAuthTokenRequired) {
      fetchOptions.headers!.Authorization = `${tokenType} ${resolvedAccessToken}`
    }

    let language
    if (isServer) {
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

    const methodsToSetContentType = ['POST', 'PUT', 'PATCH']
    if (setContentType && methodsToSetContentType.includes(fetchOptions.method || '')) {
      fetchOptions.headers!['Content-Type'] = 'application/json; charset=utf-8'
    }

    // had to override the fetchOptions type because of the GraphQLBody type
    const response = await fetch(fetchUrl, fetchOptions as RequestInit)

    if (response.status === 401 && !hasRetried && isAuthTokenRequired && !isServer) {
      const outcome = await awaitSessionRecovery({
        source: 'fetch',
        path,
        status: 401,
        hasRefreshToken: !!refreshAuthToken,
      })

      if (outcome === 'refreshed') {
        return executeRequest(true)
      }
    }

    const isJsonResponse = response.headers.get('content-type')?.includes('application/json')

    if (!response.ok && throwError) {
      const errorMessage = isJsonResponse ? await response.json() : response.statusText
      throw new Error(JSON.stringify(errorMessage))
    }

    if (isJsonResponse) {
      const data = await response.json()
      return camelizeResponseDataKeys ? humps.camelizeKeys(data) : data
    }

    return response
  }

  try {
    return await executeRequest()
  } catch (error) {
    return Promise.reject(error)
  }
}
