export interface ResolveApiUrlOptions {
  /**
   * The host the user is on, sent as `X-Forwarded-Host` by server-side calls to a relative API
   * address. Defaults to the incoming request's host (`X-Forwarded-Host`, else `Host`). When given
   * without `incomingHeaders`, the incoming request isn't read at all.
   */
  host?: string
  /**
   * The headers of the request being handled, read instead of `next/headers`. Pass them where
   * `next/headers` isn't available, such as middleware (`request.headers`), so the forwarded
   * host, scheme and visitor address (`INTERNAL_API_FORWARDED_FOR_TRIM`) come from them.
   */
  incomingHeaders?: Headers
}

export interface ResolvedApiUrl {
  url: string | undefined
  headers: Record<string, string>
}
