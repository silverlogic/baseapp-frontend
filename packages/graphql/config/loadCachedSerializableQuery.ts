import { cache } from 'react'

import { OperationType, RequestParameters, VariablesOf } from 'relay-runtime'
import { ConcreteRequest } from 'relay-runtime/lib/util/RelayConcreteNode'

import loadSerializableQuery, { SerializablePreloadedQuery } from './loadSerializableQuery'

// React.cache dedupes by argument identity: `params` is a module singleton from the generated
// query artifact, and variables are serialized so structurally equal objects compare by value.
const loadCached = cache((params: RequestParameters, serializedVariables: string) =>
  loadSerializableQuery(params, JSON.parse(serializedVariables)),
)

/**
 * Request-scoped memoized `loadSerializableQuery`: callers passing the same query params and
 * variables within one server request (e.g. `generateMetadata` and the page component) share a
 * single GraphQL round-trip. The cache never outlives the request, so responses fetched with
 * one user's credentials cannot leak into another request.
 *
 * Server Components only — outside of them React's `cache` is a no-op and every call fetches.
 */
export default async function loadCachedSerializableQuery<
  TRequest extends ConcreteRequest,
  TQuery extends OperationType,
>(
  params: RequestParameters,
  variables: VariablesOf<TQuery>,
): Promise<SerializablePreloadedQuery<TRequest, TQuery>> {
  return (await loadCached(params, JSON.stringify(variables))) as SerializablePreloadedQuery<
    TRequest,
    TQuery
  >
}
