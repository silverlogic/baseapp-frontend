'use client'

import { FC, Suspense } from 'react'

import { useRelayEnvironment } from 'react-relay'
import { ConcreteRequest, OperationType } from 'relay-runtime'

import { useSerializablePreloadedQuery } from '../../config'
import { ComponentWithPreloadedQuery, ComponentWithQueryRef, WithRelayOptions } from './types'

/**
 * Relay HOC for components that uses preloaded queries.
 *
 * @description
 * This is a **BaseApp** feature.
 *
 * If you believe your changes should be in the BaseApp, please read the **CONTRIBUTING.md** guide.
 */
const withRelay =
  <QueryNode extends ConcreteRequest, Query extends OperationType, Props = {}>(
    Component: FC<Props & ComponentWithQueryRef<Query>>,
    { fallback = 'Loading...', fetchPolicy = 'store-or-network' }: WithRelayOptions = {},
  ) =>
  (props: Props & ComponentWithPreloadedQuery<QueryNode, Query>) => {
    const { preloadedQuery } = props
    const environment = useRelayEnvironment()
    const queryRef = useSerializablePreloadedQuery<QueryNode, Query>(
      environment,
      preloadedQuery,
      fetchPolicy,
    )

    return (
      <Suspense fallback={fallback}>
        <Component {...props} queryRef={queryRef} />
      </Suspense>
    )
  }

export default withRelay
