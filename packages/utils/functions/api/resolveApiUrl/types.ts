export interface ResolveApiUrlOptions {
  /**
   * The host the user is on, sent as `X-Forwarded-Host` by server-side calls to a relative API
   * address. Defaults to the incoming request's host (`X-Forwarded-Host`, else `Host`), read with
   * `next/headers`. When given, the incoming request isn't read at all.
   */
  host?: string
}

export interface ResolvedApiUrl {
  url: string | undefined
  headers: Record<string, string>
}
