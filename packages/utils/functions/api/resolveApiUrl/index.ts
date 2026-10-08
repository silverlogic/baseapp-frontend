import { isRelativeUrl } from '../isRelativeUrl'
import { FORWARDED_HOST_HEADER, FORWARDED_SCHEME_HEADERS } from './constants'
import type { ResolveApiUrlOptions, ResolvedApiUrl } from './types'

// A proxy chain may list several hosts; the first is the one the browser asked for.
const firstListed = (value: string) => value.split(',')[0]!.trim()

const getForwardedHeaders = async ({ host }: ResolveApiUrlOptions) => {
  if (host) {
    return { [FORWARDED_HOST_HEADER]: host }
  }

  const { headers } = await import('next/headers')
  const incomingHeaders = await headers()
  const incomingHost = incomingHeaders.get('x-forwarded-host') ?? incomingHeaders.get('host')
  if (!incomingHost) {
    throw new Error('The incoming request has no host to forward to the API.')
  }

  const forwardedHeaders: Record<string, string> = {
    [FORWARDED_HOST_HEADER]: firstListed(incomingHost),
  }
  FORWARDED_SCHEME_HEADERS.forEach((name) => {
    const value = incomingHeaders.get(name)
    if (value) {
      forwardedHeaders[name] = value
    }
  })
  return forwardedHeaders
}

/**
 * Resolves a configured API address (such as `NEXT_PUBLIC_API_BASE_URL`) into the URL to call and
 * the headers to send with it.
 *
 * - An absolute address (`https://api.example.com/v1`) is returned unchanged, with no headers.
 * - A relative address (`/v1`) lets one deployment serve several hosts, each calling the API on its
 *   own host. In the browser it's returned unchanged, so it resolves against the page's address.
 *   On the server, where there is no page address, it's prefixed with `INTERNAL_API_ORIGIN` (the
 *   API's origin as reached from this server, e.g. `http://web:8000`), and the host the user is on
 *   is sent as `X-Forwarded-Host`, along with the incoming `X-Forwarded-Proto` /
 *   `X-Forwarded-Protocol` when present.
 *
 * @description
 * This is a **BaseApp** feature.
 *
 * If you believe your changes should be in the BaseApp, please read the **CONTRIBUTING.md** guide.
 *
 * @example
 * ```ts
 * const { url, headers } = await resolveApiUrl(process.env.NEXT_PUBLIC_API_BASE_URL)
 * await fetch(`${url}/users/me`, { headers })
 * ```
 */
export const resolveApiUrl = async (
  baseUrl?: string,
  options: ResolveApiUrlOptions = {},
): Promise<ResolvedApiUrl> => {
  if (!isRelativeUrl(baseUrl) || typeof window !== typeof undefined) {
    return { url: baseUrl, headers: {} }
  }

  const internalOrigin = process.env.INTERNAL_API_ORIGIN
  if (!internalOrigin) {
    throw new Error(
      `The API address '${baseUrl}' is relative, so server-side calls need INTERNAL_API_ORIGIN: ` +
        "the API's origin as reached from this server (e.g. http://web:8000).",
    )
  }

  return {
    url: `${internalOrigin.replace(/\/+$/, '')}${baseUrl}`,
    headers: await getForwardedHeaders(options),
  }
}
