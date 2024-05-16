import { useMemo } from 'react'

import { baseAppFetch } from '@baseapp-frontend/utils/functions/fetch/baseAppFetch'
import { getToken } from '@baseapp-frontend/utils/functions/token/getToken'

import { createClient } from 'graphql-ws'
import WebSocket from 'isomorphic-ws'
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
  const response = await baseAppFetch('', {
    baseUrl: process.env.NEXT_PUBLIC_RELAY_ENDPOINT,
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

const wsClient = createClient({
  url: process.env.NEXT_PUBLIC_WS_RELAY_ENDPOINT as string,
  connectionParams: () => {
    const Authorization = getToken()
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

function createEnvironment() {
  const cache = createQueryCache()
  const network = createNetwork(cache)
  const store = new Store(RecordSource.create())

  const environment = new Environment({
    network,
    store,
    isServer: typeof window === typeof undefined,
  })

  responseCacheByEnvironment.set(environment, cache)

  return environment
}

let relayEnvironment: Environment | null = null
function initEnvironment() {
  const environment = relayEnvironment ?? createEnvironment()
  // For SSR always return new environment;
  if (typeof window === typeof undefined) return environment
  if (!relayEnvironment) relayEnvironment = environment
  return relayEnvironment
}

export function useEnvironment() {
  const env = useMemo(() => initEnvironment(), [relayEnvironment])
  return env
}

export function getCacheByEnvironment(environment: Environment) {
  return responseCacheByEnvironment.get(environment)
}
