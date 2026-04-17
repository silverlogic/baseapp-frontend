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

async function resolveCurrentProfile(isServer: boolean): Promise<string | null | undefined> {
  if (isServer) {
    const { getTokenSSR } = await import('../../token/getTokenSSR')
    return getTokenSSR(CURRENT_PROFILE_KEY_NAME)
  }
  const { getToken } = await import('../../token/getToken')
  return getToken(CURRENT_PROFILE_KEY_NAME)
}

async function resolveAuthTokens(
  isServer: boolean,
  accessKeyName: string,
  refreshKeyName: string,
): Promise<{ accessToken: string | null | undefined; refreshToken: string | null | undefined }> {
  if (isServer) {
    const { getTokenSSR } = await import('../../token/getTokenSSR')
    return {
      accessToken: await getTokenSSR(accessKeyName),
      refreshToken: await getTokenSSR(refreshKeyName),
    }
  }
  const { getToken } = await import('../../token/getToken')
  return {
    accessToken: getToken(accessKeyName),
    refreshToken: getToken(refreshKeyName),
  }
}

async function resolveLanguage(
  isServer: boolean,
  languageCookieName: string,
): Promise<string | null | undefined> {
  if (isServer) {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    return cookieStore.get(languageCookieName)?.value
  }
  const { getLanguage } = await import('../../language/getLanguage')
  return getLanguage(languageCookieName)
}

async function getLatestAccessToken(accessKeyName: string): Promise<string | null | undefined> {
  const { getToken } = await import('../../token/getToken')
  return getToken(accessKeyName)
}

const METHODS_TO_SET_CONTENT_TYPE = new Set(['POST', 'PUT', 'PATCH'])

function prepareFetchOptions({
  options,
  currentProfileId,
  resolvedAccessToken,
  isAuthTokenRequired,
  tokenType,
  language,
  setContentType,
  stringifyBody,
  decamelizeRequestBodyKeys,
}: {
  options: RequestOptions
  currentProfileId: string
  resolvedAccessToken: string | null | undefined
  isAuthTokenRequired: boolean
  tokenType: string
  language: string | null | undefined
  setContentType: boolean
  stringifyBody: boolean
  decamelizeRequestBodyKeys: boolean
}): RequestOptions {
  const fetchOptions: RequestOptions = {
    ...options,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Current-Profile': currentProfileId,
      ...options.headers,
    },
  }

  if (options.body && stringifyBody) {
    fetchOptions.body = decamelizeRequestBodyKeys
      ? JSON.stringify(humps.decamelizeKeys(options.body))
      : JSON.stringify(options.body)
  }

  const headers = fetchOptions.headers as NonNullable<RequestOptions['headers']>

  if (!headers.Authorization && resolvedAccessToken && isAuthTokenRequired) {
    headers.Authorization = `${tokenType} ${resolvedAccessToken}`
  }

  if (language) {
    headers['Accept-Language'] = language
  }

  if (setContentType && METHODS_TO_SET_CONTENT_TYPE.has(fetchOptions.method || '')) {
    headers['Content-Type'] = 'application/json; charset=utf-8'
  }

  return fetchOptions
}

async function shouldRetryRequest({
  response,
  hasRetried,
  isAuthTokenRequired,
  isServer,
  accessKeyName,
  resolvedAccessToken,
  path,
  refreshAuthToken,
}: {
  response: Response
  hasRetried: boolean
  isAuthTokenRequired: boolean
  isServer: boolean
  accessKeyName: string
  resolvedAccessToken: string | null | undefined
  path: string
  refreshAuthToken: string | null | undefined
}): Promise<boolean> {
  if (response.status !== 401 || hasRetried || !isAuthTokenRequired || isServer) {
    return false
  }

  const latestAccessToken = await getLatestAccessToken(accessKeyName)

  if (latestAccessToken && latestAccessToken !== resolvedAccessToken) {
    return true
  }

  const outcome = await awaitSessionRecovery({
    source: 'fetch',
    path,
    status: 401,
    hasRefreshToken: !!refreshAuthToken,
  })

  return outcome === 'refreshed'
}

async function parseResponseData({
  response,
  camelizeResponseDataKeys,
  throwError,
}: {
  response: Response
  camelizeResponseDataKeys: boolean
  throwError: boolean
}) {
  const isJsonResponse = response.headers.get('content-type')?.includes('application/json')

  if (!response.ok && throwError) {
    const errorMessage = isJsonResponse ? await response.json() : response.statusText
    throw new Error(JSON.stringify(errorMessage))
  }

  if (!isJsonResponse) {
    return response
  }

  const data = await response.json()
  return camelizeResponseDataKeys ? humps.camelizeKeys(data) : data
}

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
  const isServer = typeof globalThis.window === typeof undefined
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
    const currentProfile = await resolveCurrentProfile(isServer)
    const parsedCurrentProfile = parseString<MinimalProfile>(currentProfile ?? undefined)
    const { accessToken: accessAuthToken, refreshToken: refreshAuthToken } =
      await resolveAuthTokens(isServer, accessKeyName, refreshKeyName)

    const resolvedAccessToken = accessTokenOverride ?? accessAuthToken
    const language = await resolveLanguage(isServer, languageCookieName)
    const fetchOptions = prepareFetchOptions({
      options,
      currentProfileId: parsedCurrentProfile?.id ?? '',
      resolvedAccessToken,
      isAuthTokenRequired,
      tokenType,
      language,
      setContentType,
      stringifyBody,
      decamelizeRequestBodyKeys,
    })

    // had to override the fetchOptions type because of the GraphQLBody type
    const response = await fetch(fetchUrl, fetchOptions as RequestInit)

    const retry = await shouldRetryRequest({
      response,
      hasRetried,
      isAuthTokenRequired,
      isServer,
      accessKeyName,
      resolvedAccessToken,
      path,
      refreshAuthToken,
    })

    if (retry) return executeRequest(true)

    return parseResponseData({
      response,
      camelizeResponseDataKeys,
      throwError,
    })
  }

  try {
    return await executeRequest()
  } catch (error) {
    return Promise.reject(error)
  }
}
