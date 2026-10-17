import { isRelativeUrl } from '../isRelativeUrl'
import { resolveWebSocketUrl } from '../resolveWebSocketUrl'

/**
 * The `url` option for a `graphql-ws` client. An absolute endpoint is passed as is. A relative one
 * becomes a function, so it's resolved against the page's address at each connection attempt
 * rather than when the client is created (which may happen on the server).
 *
 * @description
 * This is a **BaseApp** feature.
 *
 * If you believe your changes should be in the BaseApp, please read the **CONTRIBUTING.md** guide.
 */
export const getWebSocketClientUrl = (endpoint: string) =>
  isRelativeUrl(endpoint) ? () => resolveWebSocketUrl(endpoint) : endpoint
