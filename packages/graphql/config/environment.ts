import { MinimalProfile } from '@baseapp-frontend/authentication'
import {
  ACCESS_KEY_NAME,
  REFRESH_KEY_NAME,
  getExpoConstant,
  parseString,
} from '@baseapp-frontend/utils'
import { CURRENT_PROFILE_KEY_NAME } from '@baseapp-frontend/utils/constants/profile'
import { awaitSessionRecovery } from '@baseapp-frontend/utils/functions/auth/awaitSessionRecovery'
import { baseAppFetch } from '@baseapp-frontend/utils/functions/fetch/baseAppFetch'
import { getToken } from '@baseapp-frontend/utils/functions/token/getToken'

import { createClient } from 'graphql-ws'
import WebSocket from 'isomorphic-ws'
import ConnectionHandler from 'relay-connection-handler-plus'
import {
  CacheConfig,
  Environment,
  GraphQLResponse,
  Network,
  Observable,
  QueryResponseCache,
  RecordSource,
  RequestParameters,
  Store,
  UploadableMap,
  Variables,
} from 'relay-runtime'
import RelayDefaultHandlerProvider, {
  HandlerProvider,
} from 'relay-runtime/lib/handlers/RelayDefaultHandlerProvider'

const CACHE_TTL = 5 * 1000 // 5 seconds, to resolve preloaded results

type GetFetchOptions = {
  request: RequestParameters
  variables: Variables
  uploadables?: UploadableMap | null
}

const getFetchOptions = ({ request, variables, uploadables }: GetFetchOptions) => {
  const requestVariables = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  }

  if (uploadables) {
    const formData = new FormData()
    formData.append('query', request.text as string)
    formData.append('variables', JSON.stringify(variables))
    Object.entries(uploadables).forEach(([key, value]) => {
      formData.append(key, value)
    })
    return {
      ...requestVariables,
      body: formData,
    }
  }

  return {
    ...requestVariables,
    body: {
      query: request.text,
      operationName: request.name,
      operationKind: request.operationKind,
      variables,
    },
  }
}

type GraphQLErrorLike = {
  message?: string
  extensions?: {
    code?: unknown
  }
}

function getGraphQLErrors(response: GraphQLResponse): GraphQLErrorLike[] {
  if (
    !response ||
    typeof response !== 'object' ||
    !('errors' in response) ||
    !Array.isArray(response.errors)
  ) {
    return []
  }

  return response.errors as GraphQLErrorLike[]
}

function hasUnauthorizedGraphQLErrors(response: GraphQLResponse): boolean {
  const errors = getGraphQLErrors(response)
  if (errors.length === 0) return false

  return errors.some((error) => {
    const message = typeof error?.message === 'string' ? error.message : ''
    const code =
      error &&
      typeof error === 'object' &&
      'extensions' in error &&
      error.extensions &&
      typeof error.extensions === 'object' &&
      'code' in error.extensions
        ? String(error.extensions.code)
        : ''

    return (
      /invalid token/i.test(message) ||
      /authentication credentials/i.test(message) ||
      /not authenticated/i.test(message) ||
      /signature has expired/i.test(message) ||
      code === 'UNAUTHENTICATED'
    )
  })
}

export async function httpFetch(
  request: RequestParameters,
  variables: Variables,
  cacheConfig?: CacheConfig,
  uploadables?: UploadableMap | null,
): Promise<GraphQLResponse> {
  const attemptFetch = async (hasRetried = false): Promise<GraphQLResponse> => {
    const fetchOptions = getFetchOptions({ request, variables, uploadables })
    const EXPO_PUBLIC_RELAY_ENDPOINT = getExpoConstant('EXPO_PUBLIC_RELAY_ENDPOINT')
    const isServer = typeof globalThis.window === typeof undefined
    const accessTokenAtRequestStart = isServer ? null : (getToken(ACCESS_KEY_NAME) ?? null)

    const response = await baseAppFetch('', {
      baseUrl: (process.env.NEXT_PUBLIC_RELAY_ENDPOINT ?? EXPO_PUBLIC_RELAY_ENDPOINT) as string,
      decamelizeRequestBodyKeys: false,
      decamelizeRequestParamsKeys: false,
      camelizeResponseDataKeys: false,
      stringifyBody: !uploadables,
      setContentType: !uploadables,
      ...fetchOptions,
    })

    if (!hasRetried && !isServer && hasUnauthorizedGraphQLErrors(response)) {
      const latestAccessToken = getToken(ACCESS_KEY_NAME)

      if (latestAccessToken && latestAccessToken !== accessTokenAtRequestStart) {
        return attemptFetch(true)
      }

      const outcome = await awaitSessionRecovery({
        source: 'fetch',
        path: '/graphql',
        status: 200,
        hasRefreshToken: !!getToken(REFRESH_KEY_NAME),
      })

      if (outcome === 'refreshed') {
        return attemptFetch(true)
      }
    }

    const errors = getGraphQLErrors(response)
    if (errors.length > 0) {
      throw new Error(
        `Error fetching GraphQL query '${request.name}' with variables '${JSON.stringify(
          variables,
        )}': ${JSON.stringify(errors)}`,
      )
    }

    return response
  }

  return attemptFetch()
}

const EXPO_PUBLIC_WS_RELAY_ENDPOINT = getExpoConstant('EXPO_PUBLIC_WS_RELAY_ENDPOINT')
const wsClient = createClient({
  url: (process.env.NEXT_PUBLIC_WS_RELAY_ENDPOINT ?? EXPO_PUBLIC_WS_RELAY_ENDPOINT) as string,
  connectionParams: () => {
    const Authorization = getToken(ACCESS_KEY_NAME)
    const CurrentProfileStr = getToken(CURRENT_PROFILE_KEY_NAME) || undefined
    const CurrentProfile = parseString<MinimalProfile>(CurrentProfileStr)
    if (!Authorization) return {}
    return {
      Authorization,
      'Current-Profile': CurrentProfile ? CurrentProfile.id : undefined,
    }
  },
  retryAttempts: Infinity,
  webSocketImpl: WebSocket,
})

const websocketFetch = (request: RequestParameters, variables: Variables): Observable<any> =>
  Observable.create((sink) => {
    if (!request.text) {
      return sink.error(new Error('Operation text cannot be empty'))
    }
    return wsClient.subscribe(
      {
        operationName: request.name,
        query: request.text,
        variables,
      },
      sink,
    )
  })

function createNetwork(responseCache: QueryResponseCache) {
  async function fetchResponse(
    request: RequestParameters,
    variables: Variables,
    cacheConfig: CacheConfig,
    uploadables?: UploadableMap | null,
  ) {
    const isQuery = request.operationKind === 'query'
    const cacheKey = request.id ?? request.cacheID
    const forceFetch = cacheConfig && cacheConfig.force
    if (responseCache != null && isQuery && !forceFetch) {
      const fromCache = responseCache.get(cacheKey, variables)
      if (fromCache != null) {
        return Promise.resolve(fromCache)
      }
    }

    return httpFetch(request, variables, cacheConfig, uploadables)
  }

  const network = Network.create(fetchResponse, websocketFetch)
  return network
}

function createQueryCache() {
  return new QueryResponseCache({
    size: 100,
    ttl: CACHE_TTL,
  })
}

const responseCacheByEnvironment = new WeakMap<Environment, QueryResponseCache>()

function handlerProvider(handle: string) {
  switch (handle) {
    case 'connection':
      return ConnectionHandler
    default:
      return (RelayDefaultHandlerProvider as unknown as HandlerProvider)(handle)
  }
}

export function createEnvironment() {
  const cache = createQueryCache()
  const network = createNetwork(cache)
  const store = new Store(RecordSource.create())

  const environment = new Environment({
    handlerProvider,
    network,
    store,
    isServer: typeof globalThis.window === typeof undefined,
  })

  responseCacheByEnvironment.set(environment, cache)

  return environment
}

export function getCacheByEnvironment(environment: Environment) {
  return responseCacheByEnvironment.get(environment)
}
