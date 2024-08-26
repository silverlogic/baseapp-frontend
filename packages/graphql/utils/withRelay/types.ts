import { ReactNode } from 'react'

import { PreloadFetchPolicy, PreloadedQuery } from 'react-relay'
import { ConcreteRequest, OperationType } from 'relay-runtime'

import { SerializablePreloadedQuery } from '../../config'

export type WithRelayOptions = {
  fallback?: ReactNode
  fetchPolicy?: PreloadFetchPolicy
}

export interface ComponentWithQueryRef<Query extends OperationType> {
  queryRef: PreloadedQuery<Query, Record<string, unknown>>
}

export interface ComponentWithPreloadedQuery<
  QueryNode extends ConcreteRequest,
  Query extends OperationType,
> {
  preloadedQuery: SerializablePreloadedQuery<QueryNode, Query>
}
