import { isRelativeUrl } from '../isRelativeUrl'
import { FORWARDED_FOR_HEADER, FORWARDED_HOST_HEADER, FORWARDED_SCHEME_HEADERS } from './constants'
import type { ResolveApiUrlOptions, ResolvedApiUrl } from './types'

// A proxy chain may list several hosts; the first is the one the browser asked for.
const firstListed = (value: string) => value.split(',')[0]!.trim()

/**
 * How many entries to drop from the end of the incoming `X-Forwarded-For` before forwarding it,
 * from `INTERNAL_API_FORWARDED_FOR_TRIM`. `undefined` (unset or empty) means the visitor's address
 * isn't forwarded at all.
 */
const getForwardedForTrim = () => {
  const value = process.env.INTERNAL_API_FORWARDED_FOR_TRIM?.trim()
  if (!value) {
    return undefined
  }
  if (!/^\d+$/.test(value)) {
    throw new Error(
      `INTERNAL_API_FORWARDED_FOR_TRIM must be a whole number of X-Forwarded-For entries (e.g. 0), got '${value}'.`,
    )
  }
  return Number(value)
}

const trimForwardedFor = (value: string | null, trim: number) => {
  const entries = (value ?? '')
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
  return entries.length > trim ? entries.slice(0, entries.length - trim).join(', ') : undefined
}

const readIncomingHeaders = async ({ incomingHeaders }: ResolveApiUrlOptions) => {
  if (incomingHeaders) {
    return incomingHeaders
  }
  const { headers } = await import('next/headers')
  return headers()
}

const getForwardedHeaders = async (options: ResolveApiUrlOptions) => {
  const forwardedForTrim = getForwardedForTrim()
  if (options.host && !options.incomingHeaders) {
    return { [FORWARDED_HOST_HEADER]: options.host }
  }

  const incomingHeaders = await readIncomingHeaders(options)
  const incomingHost = incomingHeaders.get('x-forwarded-host') ?? incomingHeaders.get('host')
  const host = options.host ?? (incomingHost ? firstListed(incomingHost) : undefined)
  if (!host) {
    throw new Error('The incoming request has no host to forward to the API.')
  }

  const forwardedHeaders: Record<string, string> = { [FORWARDED_HOST_HEADER]: host }
  FORWARDED_SCHEME_HEADERS.forEach((name) => {
    const value = incomingHeaders.get(name)
    if (value) {
      forwardedHeaders[name] = value
    }
  })
  if (forwardedForTrim !== undefined) {
    const forwardedFor = trimForwardedFor(
      incomingHeaders.get(FORWARDED_FOR_HEADER),
      forwardedForTrim,
    )
    if (forwardedFor) {
      forwardedHeaders[FORWARDED_FOR_HEADER] = forwardedFor
    }
  }
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
 * - With `INTERNAL_API_FORWARDED_FOR_TRIM=<n>` set, that server-side call also forwards the
 *   incoming `X-Forwarded-For` without its last `n` entries, so the visitor stays at the hop
 *   position the API trusts (per-IP throttles, rate limits, security logs) instead of every
 *   server-side call coming from this server's address. `n` is `0` when `INTERNAL_API_ORIGIN`
 *   reaches the API directly; trimming an entry nothing re-adds exposes a client-supplied address
 *   (see the README). Unset, `X-Forwarded-For` isn't sent, as before.
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
 *
 * @example In middleware, where `next/headers` isn't available
 * ```ts
 * const { url, headers } = await resolveApiUrl(process.env.NEXT_PUBLIC_API_BASE_URL, {
 *   incomingHeaders: request.headers,
 * })
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
