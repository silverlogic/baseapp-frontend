export interface PrototypeFetchContext {
  // The base URL the caller asked for (`baseUrl`, else the API base URL from the environment), or
  // `undefined`. An app that answers locally sets no API base URL, so a value here means the call
  // targets another API (e.g. Wagtail) that has the same path shape.
  baseUrl?: string
}

export type PrototypeFetch = (
  // The API path with its query string (`/users/me`, `/notifications?page=2`), with no base URL:
  // there is no API address in an app that answers locally.
  path: string,
  // The request exactly as it would go to the API: method, stringified body, headers.
  init: RequestInit,
  context?: PrototypeFetchContext,
) => Promise<Response>

export type GlobalWithPrototypeFetch = typeof globalThis & {
  [key: symbol]: PrototypeFetch | undefined
}
