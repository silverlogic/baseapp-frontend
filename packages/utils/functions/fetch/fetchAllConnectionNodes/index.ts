import { DEFAULT_MAX_PAGES } from './constants'
import { ConnectionPage, FetchAllConnectionNodesOptions, FetchConnectionPage } from './types'

/**
 * Walks a cursor-based (Relay-style) connection page by page and returns every non-null node.
 *
 * @description
 * This is a **BaseApp** feature.
 *
 * The caller supplies the page fetcher, so this works with any transport (Relay, plain
 * GraphQL, REST) whose responses expose `edges` and `pageInfo`.
 *
 * @example
 * ```ts
 * const nodes = await fetchAllConnectionNodes(async (after) => {
 *   const data = await fetchMyQuery({ first: 100, after })
 *   return data.allItems
 * })
 * ```
 */
export const fetchAllConnectionNodes = async <TNode>(
  fetchPage: FetchConnectionPage<TNode>,
  { maxPages = DEFAULT_MAX_PAGES }: FetchAllConnectionNodesOptions = {},
): Promise<TNode[]> => {
  const nodes: TNode[] = []
  let after: string | null = null

  for (let pageCount = 0; pageCount < maxPages; pageCount += 1) {
    // eslint-disable-next-line no-await-in-loop -- cursor pagination is inherently sequential
    const page: ConnectionPage<TNode> | null | undefined = await fetchPage(after)
    if (!page) break

    page.edges?.forEach((edge) => {
      if (edge?.node) nodes.push(edge.node)
    })

    const { hasNextPage, endCursor } = page.pageInfo
    if (!hasNextPage || !endCursor) break
    after = endCursor
  }

  return nodes
}
