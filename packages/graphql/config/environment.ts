import { MinimalProfile } from '@baseapp-frontend/authentication'
import {
  ACCESS_KEY_NAME,
  getExpoConstant,
  getWebSocketClientUrl,
  parseString,
} from '@baseapp-frontend/utils'
import { REFRESH_KEY_NAME } from '@baseapp-frontend/utils/constants/jwt'
import { CURRENT_PROFILE_KEY_NAME } from '@baseapp-frontend/utils/constants/profile'
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

export const CACHE_TTL = 5 * 1000 // 5 seconds, to resolve preloaded results

const MAX_WS_RETRY_ATTEMPTS = 10
const BASE_WS_RETRY_DELAY_IN_MS = 1000
const MAX_WS_RETRY_DELAY_IN_MS = 30 * 1000

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
    const error = new Error(
      `Error fetching GraphQL query '${request.name}' with variables '${JSON.stringify(
        variables,
      )}': ${JSON.stringify(response.errors)}`,
    )
    // Preserve the structured GraphQL errors so consumers can surface a clean,
    // human-friendly message (see `getGraphQLErrorMessage`) instead of this verbose
    // wrapper, which leaks the query name, variables, and raw backend detail.
    ;(error as Error & { graphQLErrors?: unknown }).graphQLErrors = response.errors
    throw error
  }

  return response
}

type WebSocketClient = ReturnType<typeof createClient>

const createWebSocketClient = (): WebSocketClient =>
  createClient({
    url: getWebSocketClientUrl(
      (process.env.NEXT_PUBLIC_WS_RELAY_ENDPOINT ??
        getExpoConstant('EXPO_PUBLIC_WS_RELAY_ENDPOINT')) as string,
    ),
    connectionParams: () => {
      const Authorization = getToken(ACCESS_KEY_NAME)
      if (!Authorization) return {}

      const Refresh = getToken(REFRESH_KEY_NAME) || undefined
      const CurrentProfileStr = getToken(CURRENT_PROFILE_KEY_NAME) || undefined
      const CurrentProfile = parseString<MinimalProfile>(CurrentProfileStr)
      return {
        Authorization,
        Refresh,
        'Current-Profile': CurrentProfile ? CurrentProfile.id : undefined,
      }
    },
    retryAttempts: MAX_WS_RETRY_ATTEMPTS,
    retryWait: async (retries) => {
      const backoff = Math.min(BASE_WS_RETRY_DELAY_IN_MS * 2 ** retries, MAX_WS_RETRY_DELAY_IN_MS)
      const jitter = Math.random() * backoff // NOSONAR: Math.random() is acceptable for non-cryptographic jitter
      await new Promise((resolve) => {
        setTimeout(resolve, backoff + jitter)
      })
    },
    webSocketImpl: WebSocket,
  })

// Each environment owns its websocket client, so retiring one session's environment closes that
// session's authenticated socket without touching another's. The client is created on the first
// subscription: environments that never subscribe (e.g. on the server) never build one, and a
// subscription after `dispose()` builds a new one.
type LazyWebSocketClient = {
  get: () => WebSocketClient
  dispose: () => void
}

const createLazyWebSocketClient = (): LazyWebSocketClient => {
  let client: WebSocketClient | undefined

  return {
    get: () => {
      client ??= createWebSocketClient()
      return client
    },
    dispose: () => {
      const retired = client
      client = undefined
      try {
        // A socket that never finished its handshake may reject dispose(); retiring a session
        // (e.g. on logout) must never fail because of it.
        Promise.resolve(retired?.dispose()).catch(() => undefined)
      } catch {
        // Same for a synchronous transport error.
      }
    },
  }
}

const createWebsocketFetch =
  (webSocketClient: LazyWebSocketClient) =>
  (request: RequestParameters, variables: Variables): Observable<any> =>
    Observable.create((sink) => {
      if (!request.text) {
        return sink.error(new Error('Operation text cannot be empty'))
      }
      return webSocketClient.get().subscribe(
        {
          operationName: request.name,
          query: request.text,
          variables,
        },
        sink,
      )
    })

function createNetwork(responseCache: QueryResponseCache, webSocketClient: LazyWebSocketClient) {
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

  const network = Network.create(fetchResponse, createWebsocketFetch(webSocketClient))
  return network
}

function createQueryCache() {
  return new QueryResponseCache({
    size: 100,
    ttl: CACHE_TTL,
  })
}

const responseCacheByEnvironment = new WeakMap<Environment, QueryResponseCache>()
const recordSourceByEnvironment = new WeakMap<Environment, ReturnType<typeof RecordSource.create>>()
const webSocketClientByEnvironment = new WeakMap<Environment, LazyWebSocketClient>()

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
  const webSocketClient = createLazyWebSocketClient()
  const network = createNetwork(cache, webSocketClient)
  const source = RecordSource.create()
  const store = new Store(source)

  const environment = new Environment({
    handlerProvider,
    network,
    store,
    isServer: typeof window === typeof undefined,
  })

  responseCacheByEnvironment.set(environment, cache)
  recordSourceByEnvironment.set(environment, source)
  webSocketClientByEnvironment.set(environment, webSocketClient)

  return environment
}

export function getCacheByEnvironment(environment: Environment) {
  return responseCacheByEnvironment.get(environment)
}

/**
 * Retires an environment when the session that filled it ends (logout, or a switch to another
 * account): it empties the preloaded-response cache and the store, including records written by
 * optimistic updates, so nothing from the old session can be read from it, and closes the
 * environment's authenticated websocket. Transport errors are swallowed: disposing never throws.
 *
 * Prefer a new environment for the next session (`RelayProvider` does all of this for you when
 * given a `sessionKey`). An environment that is used again starts from an empty store, and its next
 * subscription opens a new websocket with the credentials of that moment.
 *
 * @description
 * This is a **BaseApp** feature.
 *
 * If you believe your changes should be in the BaseApp, please read the **CONTRIBUTING.md** guide.
 */
export function disposeEnvironment(environment: Environment) {
  const store = environment.getStore()
  // `getSource()` includes records that only exist in a pending optimistic update.
  const recordIds = store.getSource().getRecordIDs()

  responseCacheByEnvironment.get(environment)?.clear()
  // Empty the base source too, so rolling back a pending optimistic update can't bring old
  // records back. Publishing a tombstone for every record then clears what is on screen, including
  // the root's fields, without deleting the root through a record proxy (which Relay forbids).
  recordSourceByEnvironment.get(environment)?.clear()
  store.publish(RecordSource.create(Object.fromEntries(recordIds.map((id) => [id, null]))))
  store.notify()

  webSocketClientByEnvironment.get(environment)?.dispose()
}
