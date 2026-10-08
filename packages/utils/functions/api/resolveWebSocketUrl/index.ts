import { isRelativeUrl } from '../isRelativeUrl'

/**
 * Resolves a configured websocket address (such as `NEXT_PUBLIC_WS_RELAY_ENDPOINT`).
 *
 * An absolute address (`wss://api.example.com/graphql`) is returned unchanged. A relative one
 * (`/graphql`) is resolved against the page's address, `ws:` or `wss:` following the page's scheme,
 * so it works in browsers that don't resolve relative websocket URLs themselves.
 *
 * @description
 * This is a **BaseApp** feature.
 *
 * If you believe your changes should be in the BaseApp, please read the **CONTRIBUTING.md** guide.
 */
export const resolveWebSocketUrl = (url: string) => {
  if (!isRelativeUrl(url)) {
    return url
  }

  if (typeof window === typeof undefined) {
    throw new Error(`The websocket address '${url}' is relative, which only a browser can resolve.`)
  }

  const scheme = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  return `${scheme}//${window.location.host}${url}`
}
