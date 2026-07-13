import { getExpoConstant } from '@baseapp-frontend/utils'

import { OperationType, RequestParameters, VariablesOf } from 'relay-runtime'

/**
 * Executes a GraphQL operation with no ambient credentials — no cookies, tokens, current
 * profile, or language headers are forwarded.
 *
 * @description
 * This is a **BaseApp** feature.
 *
 * Use it for visitor-agnostic server output whose result is shared across requesters
 * (sitemaps, public feeds, health checks), where a signed-in user's visibility must never
 * leak into a cached response. For user-scoped fetching use `httpFetch` /
 * `loadSerializableQuery` instead.
 *
 * @example
 * ```ts
 * const data = await fetchAnonymousQuery<MyQuery>(MyQueryNode.params, { first: 100 })
 * ```
 */
export default async function fetchAnonymousQuery<TQuery extends OperationType>(
  params: RequestParameters,
  variables: VariablesOf<TQuery>,
): Promise<TQuery['response']> {
  const EXPO_PUBLIC_RELAY_ENDPOINT = getExpoConstant('EXPO_PUBLIC_RELAY_ENDPOINT')
  const endpoint = (process.env.NEXT_PUBLIC_RELAY_ENDPOINT ?? EXPO_PUBLIC_RELAY_ENDPOINT) as string

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: params.text, operationName: params.name, variables }),
  })

  if (!response.ok) {
    throw new Error(`GraphQL query '${params.name}' failed with HTTP ${response.status}`)
  }

  const { data, errors } = await response.json()
  if (Array.isArray(errors) && errors.length > 0) {
    throw new Error(`GraphQL query '${params.name}' returned errors: ${JSON.stringify(errors)}`)
  }
  if (!data) {
    throw new Error(`GraphQL query '${params.name}' returned no data`)
  }

  return data
}
