'use client'

// Convert preloaded query object (with raw GraphQL Response) into
// Relay's PreloadedQuery.
import { useMemo } from 'react'

import { PreloadFetchPolicy, PreloadedQuery } from 'react-relay'
import { ConcreteRequest, Environment, OperationType } from 'relay-runtime'

import { CACHE_TTL, getCacheByEnvironment } from './environment'
import { SerializablePreloadedQuery } from './loadSerializableQuery'

// Next.js can re-deliver an old RSC payload (client router cache on back/forward
// navigation, prefetch entries). Replaying its embedded query response would
// overwrite newer store data — e.g. fields just changed by a mutation — so only
// responses younger than the response cache TTL are written. Skipping the write
// makes `store-and-network` fall through to a real network fetch instead.
// A missing `fetchedAt` (payload serialized by an older server build) is treated
// as fresh to keep rolling deploys safe.
function isStalePreloadedQuery(fetchedAt: number | undefined): boolean {
  return fetchedAt != null && Date.now() - fetchedAt > CACHE_TTL
}

function writePreloadedQueryToCache<TRequest extends ConcreteRequest, TQuery extends OperationType>(
  preloadedQueryObject: SerializablePreloadedQuery<TRequest, TQuery>,
  environment: Environment,
) {
  if (isStalePreloadedQuery(preloadedQueryObject.fetchedAt)) return

  const cacheKey = preloadedQueryObject.params.id ?? preloadedQueryObject.params.cacheID
  const responseCache = getCacheByEnvironment(environment)

  responseCache?.set(cacheKey, preloadedQueryObject.variables, preloadedQueryObject.response)
}

// This hook convert serializable preloaded query
// into Relay's PreloadedQuery object.
// It is also writes this serializable preloaded query
// into QueryResponseCache, so we the network layer
// can use these cache results when fetching data
// in `usePreloadedQuery`.
export default function useSerializablePreloadedQuery<
  TRequest extends ConcreteRequest,
  TQuery extends OperationType,
>(
  environment: Environment,
  preloadQuery: SerializablePreloadedQuery<TRequest, TQuery>,
  fetchPolicy: PreloadFetchPolicy = 'store-and-network',
): PreloadedQuery<TQuery> {
  useMemo(() => {
    writePreloadedQueryToCache(preloadQuery, environment)
  }, [preloadQuery])

  return {
    environment,
    fetchKey: preloadQuery.params.id ?? preloadQuery.params.cacheID,
    fetchPolicy,
    isDisposed: false,
    name: preloadQuery.params.name,
    kind: 'PreloadedQuery',
    variables: preloadQuery.variables,
    dispose: () => {},
  }
}
