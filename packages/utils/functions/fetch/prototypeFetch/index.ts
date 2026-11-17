import type { GlobalWithPrototypeFetch, PrototypeFetch } from './types'

/**
 * Prototype fetch (Rock 1): lets an app answer the REST API without the backend.
 *
 * An app that wants it (e.g. `apps/prototype`) registers a handler once per runtime: on the server
 * before the first request, in the browser before the first call. `baseAppFetch` and
 * `getAccessToken` then send their request to the handler instead of `fetch`, with everything else
 * (auth header, token refresh, body and key casing, error handling) unchanged. Apps that register
 * nothing call the API as before, so this package needs no prototype flag.
 */

// Kept on globalThis because Next.js compiles route handlers, Server Components and SSR into
// separate module graphs; a module-level variable would be a different instance in each.
const FETCH_KEY = Symbol.for('@baseapp-frontend/utils/prototype-fetch')

export const registerPrototypeFetch = (handler: PrototypeFetch) => {
  ;(globalThis as GlobalWithPrototypeFetch)[FETCH_KEY] = handler
}

export const getPrototypeFetch = () => (globalThis as GlobalWithPrototypeFetch)[FETCH_KEY]

export type * from './types'
