import { baseAppFetch } from '@baseapp-frontend/utils/functions/fetch/baseAppFetch'

import { Observable, type RequestParameters } from 'relay-runtime'

import { createEnvironment, httpFetch } from '../environment'
import { type PrototypeNetwork, getPrototypeNetwork, registerPrototypeNetwork } from '../prototype'

const wsSubscribe = vi.hoisted(() => vi.fn(() => () => {}))

vi.mock('@baseapp-frontend/utils/functions/fetch/baseAppFetch', () => ({
  baseAppFetch: vi.fn(async () => ({ data: { source: 'http' } })),
}))
vi.mock('graphql-ws', () => ({ createClient: () => ({ subscribe: wsSubscribe }) }))

const query = {
  id: null,
  cacheID: 'ProfileQuery',
  name: 'ProfileQuery',
  operationKind: 'query',
  text: 'query ProfileQuery { me { id } }',
  metadata: {},
} as RequestParameters

const subscription = {
  ...query,
  cacheID: 'MessagesSubscription',
  name: 'MessagesSubscription',
  operationKind: 'subscription',
  text: 'subscription MessagesSubscription { onMessage { id } }',
} as RequestParameters

const subscribeThroughEnvironment = (
  onNext: (response: unknown) => void,
  variables: Record<string, unknown> = {},
) =>
  createEnvironment()
    .getNetwork()
    .execute(subscription, variables, {})
    .subscribe({ next: onNext })

// The registry lives on globalThis; reset it so tests stay independent.
const unregisterPrototypeNetwork = () => {
  delete (globalThis as Record<symbol, unknown>)[
    Symbol.for('@baseapp-frontend/graphql/prototype-network')
  ]
}

describe('prototype network seam', () => {
  afterEach(() => {
    unregisterPrototypeNetwork()
    vi.clearAllMocks()
  })

  describe('with no network registered', () => {
    it('keeps httpFetch on the HTTP transport', async () => {
      expect(getPrototypeNetwork()).toBeUndefined()

      await expect(httpFetch(query, {})).resolves.toEqual({ data: { source: 'http' } })
      expect(baseAppFetch).toHaveBeenCalledTimes(1)
    })

    it('keeps subscriptions on the WebSocket client', () => {
      subscribeThroughEnvironment(() => {})

      expect(wsSubscribe).toHaveBeenCalledWith(
        expect.objectContaining({ operationName: 'MessagesSubscription' }),
        expect.anything(),
      )
    })
  })

  describe('with a network registered', () => {
    const network = {
      fetch: vi.fn(async () => ({ data: { source: 'prototype' } })),
      subscribe: vi.fn(() => Observable.from({ data: { source: 'prototype' } })),
    } satisfies PrototypeNetwork

    beforeEach(() => registerPrototypeNetwork(network))

    it('hands httpFetch operations to it, never touching HTTP', async () => {
      const uploadables = { avatar: new Blob() }

      await expect(httpFetch(query, { id: '1' }, {}, uploadables)).resolves.toEqual({
        data: { source: 'prototype' },
      })
      expect(network.fetch).toHaveBeenCalledWith(query, { id: '1' }, {}, uploadables)
      expect(baseAppFetch).not.toHaveBeenCalled()
    })

    it('hands subscriptions to it, never opening a WebSocket', () => {
      const onNext = vi.fn()

      subscribeThroughEnvironment(onNext, { roomId: '1' })

      expect(network.subscribe).toHaveBeenCalledWith(subscription, { roomId: '1' })
      expect(onNext).toHaveBeenCalledWith({ data: { source: 'prototype' } })
      expect(wsSubscribe).not.toHaveBeenCalled()
    })

    it('falls back to the WebSocket client when the network has no subscribe', () => {
      registerPrototypeNetwork({ fetch: network.fetch })

      subscribeThroughEnvironment(() => {})

      expect(wsSubscribe).toHaveBeenCalledTimes(1)
    })
  })
})
