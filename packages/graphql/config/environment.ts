import { ACCESS_KEY_NAME, getExpoConstant } from '@baseapp-frontend/utils'
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

export async function httpFetch(
  request: RequestParameters,
  variables: Variables,
  cacheConfig?: CacheConfig,
  uploadables?: UploadableMap | null,
): Promise<GraphQLResponse> {
  const fetchOptions = getFetchOptions({ request, variables, uploadables })
  const EXPO_PUBLIC_RELAY_ENDPOINT = getExpoConstant('EXPO_PUBLIC_RELAY_ENDPOINT')

  const response = await baseAppFetch('', {
    baseUrl: (process.env.NEXT_PUBLIC_RELAY_ENDPOINT ?? EXPO_PUBLIC_RELAY_ENDPOINT) as string,
    decamelizeRequestBodyKeys: false,
    decamelizeRequestParamsKeys: false,
    camelizeResponseDataKeys: false,
    stringifyBody: !uploadables,
    setContentType: !uploadables,
    ...fetchOptions,
  })

  // GraphQL returns exceptions (for example, a missing required variable) in the "errors"
  // property of the response. If any exceptions occurred when processing the request,
  // throw an error to indicate to the developer what went wrong.
  if (Array.isArray(response.errors)) {
    throw new Error(
      `Error fetching GraphQL query '${request.name}' with variables '${JSON.stringify(
        variables,
      )}': ${JSON.stringify(response.errors)}`,
    )
  }

  return response
}

const EXPO_PUBLIC_WS_RELAY_ENDPOINT = getExpoConstant('EXPO_PUBLIC_WS_RELAY_ENDPOINT')
const wsClient = createClient({
  url: (process.env.NEXT_PUBLIC_WS_RELAY_ENDPOINT ?? EXPO_PUBLIC_WS_RELAY_ENDPOINT) as string,
  connectionParams: () => {
    const Authorization = getToken(ACCESS_KEY_NAME)
    if (!Authorization) return {}
    return { Authorization }
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
    isServer: typeof window === typeof undefined,
  })

  responseCacheByEnvironment.set(environment, cache)

  return environment
}

export function getCacheByEnvironment(environment: Environment) {
  return responseCacheByEnvironment.get(environment)
}
