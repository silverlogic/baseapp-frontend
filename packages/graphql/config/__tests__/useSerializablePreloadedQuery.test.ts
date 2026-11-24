import { renderHook } from '@testing-library/react'
import type { ConcreteRequest, OperationType } from 'relay-runtime'

import { CACHE_TTL, createEnvironment, getCacheByEnvironment } from '../environment'
import type { SerializablePreloadedQuery } from '../loadSerializableQuery'
import useSerializablePreloadedQuery from '../useSerializablePreloadedQuery'

const response = { data: { me: { id: '1' } } }

const preload = (
  fetchedAt = Date.now(),
): SerializablePreloadedQuery<ConcreteRequest, OperationType> => ({
  params: {
    cacheID: 'preloaded-query',
    id: null,
    name: 'PreloadedQuery',
    operationKind: 'query',
    text: 'query PreloadedQuery { me { id } }',
    metadata: {},
  },
  variables: {},
  response,
  fetchedAt,
})

describe('useSerializablePreloadedQuery', () => {
  it('writes the preloaded response to the cache of the environment it is given', () => {
    const environment = createEnvironment()
    const otherEnvironment = createEnvironment()
    const query = preload()

    const { result } = renderHook(() => useSerializablePreloadedQuery(environment, query))

    expect(result.current.environment).toBe(environment)
    expect(getCacheByEnvironment(environment)?.get('preloaded-query', {})).toMatchObject(response)
    expect(getCacheByEnvironment(otherEnvironment)?.get('preloaded-query', {})).toBeNull()
  })

  it('writes the preloaded response again when the environment changes', () => {
    const environment = createEnvironment()
    const nextEnvironment = createEnvironment()
    const query = preload()

    const { result, rerender } = renderHook(
      ({ env }) => useSerializablePreloadedQuery(env, query),
      { initialProps: { env: environment } },
    )
    rerender({ env: nextEnvironment })

    expect(result.current.environment).toBe(nextEnvironment)
    expect(getCacheByEnvironment(nextEnvironment)?.get('preloaded-query', {})).toMatchObject(
      response,
    )
  })

  it('skips a preloaded response older than the cache TTL', () => {
    const environment = createEnvironment()

    renderHook(() =>
      useSerializablePreloadedQuery(environment, preload(Date.now() - CACHE_TTL - 1000)),
    )

    expect(getCacheByEnvironment(environment)?.get('preloaded-query', {})).toBeNull()
  })
})
