import type {
  CacheConfig,
  GraphQLResponse,
  Observable,
  RequestParameters,
  UploadableMap,
  Variables,
} from 'relay-runtime'

/**
 * Prototype network (Rock 1): lets an app answer GraphQL without the backend.
 *
 * An app that wants it (e.g. `apps/prototype`) registers a network once per runtime: on the server
 * before the first request, in the browser before the first fetch. `httpFetch` and
 * `websocketFetch` hand every operation to it. Apps that register nothing keep the normal
 * HTTP/WebSocket behaviour, so this package needs no prototype flag.
 */
export type PrototypeNetwork = {
  // Must resolve to plain, JSON-shaped objects, as if the response came over HTTP: Server
  // Components serialize it to the client.
  fetch: (
    request: RequestParameters,
    variables: Variables,
    cacheConfig?: CacheConfig,
    uploadables?: UploadableMap | null,
  ) => Promise<GraphQLResponse>
  subscribe?: (request: RequestParameters, variables: Variables) => Observable<GraphQLResponse>
}

// Kept on globalThis because Next.js compiles route handlers, Server Components and SSR into
// separate module graphs; a module-level variable would be a different instance in each.
const NETWORK_KEY = Symbol.for('@baseapp-frontend/graphql/prototype-network')

type GlobalWithNetwork = typeof globalThis & { [NETWORK_KEY]?: PrototypeNetwork }

export const registerPrototypeNetwork = (network: PrototypeNetwork) => {
  ;(globalThis as GlobalWithNetwork)[NETWORK_KEY] = network
}

export const getPrototypeNetwork = () => (globalThis as GlobalWithNetwork)[NETWORK_KEY]
