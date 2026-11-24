import { baseAppFetch } from '@baseapp-frontend/utils/functions/fetch/baseAppFetch'

import { createClient } from 'graphql-ws'
import {
  ConcreteRequest,
  ROOT_ID,
  RequestParameters,
  createOperationDescriptor,
  fetchQuery,
} from 'relay-runtime'

import { createEnvironment, disposeEnvironment, getCacheByEnvironment } from '../environment'

vi.mock('@baseapp-frontend/utils/functions/fetch/baseAppFetch', () => ({
  baseAppFetch: vi.fn(),
}))

vi.mock('graphql-ws', async (importOriginal) => {
  const actual = await importOriginal<typeof import('graphql-ws')>()
  return { ...actual, createClient: vi.fn(actual.createClient) }
})

// A websocket whose handshake always fails, so no test opens a real connection.
vi.mock('isomorphic-ws', () => {
  class FailedHandshake {
    static CONNECTING = 0

    static OPEN = 1

    static CLOSING = 2

    static CLOSED = 3

    readyState = 0

    onerror: ((error: Error) => void) | null = null

    constructor() {
      queueMicrotask(() => this.onerror?.(new Error('synthetic handshake failure')))
    }

    close() {
      this.readyState = 3
    }

    send() {}
  }
  return { __esModule: true, default: FailedHandshake }
})

const createClientMock = vi.mocked(createClient)
const baseAppFetchMock = vi.mocked(baseAppFetch)

const meSelections = [
  {
    kind: 'LinkedField',
    name: 'me',
    alias: null,
    args: null,
    concreteType: 'User',
    plural: false,
    storageKey: null,
    selections: [
      { kind: 'ScalarField', name: 'id', alias: null, args: null, storageKey: null },
      { kind: 'ScalarField', name: 'phone', alias: null, args: null, storageKey: null },
    ],
  },
]

const MeQuery = {
  kind: 'Request',
  fragment: {
    kind: 'Fragment',
    name: 'MeQuery',
    type: 'Query',
    metadata: null,
    argumentDefinitions: [],
    selections: meSelections,
  },
  operation: {
    kind: 'Operation',
    name: 'MeQuery',
    argumentDefinitions: [],
    selections: meSelections,
  },
  params: {
    cacheID: 'synthetic-me-query',
    id: null,
    metadata: {},
    name: 'MeQuery',
    operationKind: 'query',
    text: 'query MeQuery { me { id phone } }',
  },
} as unknown as ConcreteRequest

const deferred = <T>() => {
  let resolve: (value: T) => void = () => undefined
  let reject: (reason: unknown) => void = () => undefined
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

const readMe = (environment: ReturnType<typeof createEnvironment>) =>
  environment.lookup(createOperationDescriptor(MeQuery, {}).fragment).data as {
    me?: { id: string; phone: string } | null
  }

const subscription: RequestParameters = {
  cacheID: 'synthetic-subscription',
  id: null,
  name: 'SyntheticSubscription',
  operationKind: 'subscription',
  text: 'subscription SyntheticSubscription { test }',
  metadata: {},
}

const subscribe = (environment: ReturnType<typeof createEnvironment>) =>
  environment
    .getNetwork()
    .execute(subscription, {}, {})
    .subscribe({ error: () => undefined })

const flushMicrotasks = () =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, 0)
  })

describe('createEnvironment', () => {
  const originalEndpoint = process.env.NEXT_PUBLIC_WS_RELAY_ENDPOINT

  beforeEach(() => {
    createClientMock.mockClear()
    process.env.NEXT_PUBLIC_WS_RELAY_ENDPOINT = 'ws://synthetic.invalid/graphql'
  })

  afterAll(() => {
    process.env.NEXT_PUBLIC_WS_RELAY_ENDPOINT = originalEndpoint
  })

  it('creates no websocket client until the first subscription', async () => {
    const environment = createEnvironment()
    expect(createClientMock).not.toHaveBeenCalled()

    const first = subscribe(environment)
    const second = subscribe(environment)
    expect(createClientMock).toHaveBeenCalledTimes(1)

    first.unsubscribe()
    second.unsubscribe()
    disposeEnvironment(environment)
    await flushMicrotasks()
  })

  it('gives each environment its own websocket client', async () => {
    const environment = createEnvironment()
    const otherEnvironment = createEnvironment()

    const first = subscribe(environment)
    const second = subscribe(otherEnvironment)

    expect(createClientMock).toHaveBeenCalledTimes(2)
    expect(createClientMock.mock.results[0]?.value).not.toBe(
      createClientMock.mock.results[1]?.value,
    )

    first.unsubscribe()
    second.unsubscribe()
    disposeEnvironment(environment)
    disposeEnvironment(otherEnvironment)
    await flushMicrotasks()
  })

  it('resolves a relative websocket endpoint against the page when connecting', async () => {
    process.env.NEXT_PUBLIC_WS_RELAY_ENDPOINT = '/graphql'
    const environment = createEnvironment()
    const subscriber = subscribe(environment)

    const { url } = createClientMock.mock.calls[0]![0]
    expect(typeof url).toBe('function')
    expect(await (url as () => string)()).toBe(`ws://${window.location.host}/graphql`)

    subscriber.unsubscribe()
    disposeEnvironment(environment)
    await flushMicrotasks()
  })
})

describe('disposeEnvironment', () => {
  beforeEach(() => {
    createClientMock.mockClear()
    process.env.NEXT_PUBLIC_WS_RELAY_ENDPOINT = 'ws://synthetic.invalid/graphql'
  })

  it('purges the records, including the root, and the preloaded response cache', () => {
    const environment = createEnvironment()
    environment.commitUpdate((store) => {
      const person = store.create('person:A', 'Person')
      person.setValue('Private phone number', 'phoneNumber')
      store.getRoot().setValue('Private session detail', 'sessionDetail')
      store.getRoot().setLinkedRecord(person, 'me')
    })
    const cache = getCacheByEnvironment(environment)
    cache?.set('private-query', {}, { data: { phoneNumber: 'Private phone number' } })

    expect(() => disposeEnvironment(environment)).not.toThrow()

    expect(environment.getStore().getSource().get(ROOT_ID)).toBeNull()
    expect(environment.getStore().getSource().get('person:A')).toBeNull()
    expect(cache?.get('private-query', {})).toBeNull()
  })

  it('does not bring records back when a pending optimistic update is rolled back', () => {
    const environment = createEnvironment()
    environment.commitUpdate((store) => {
      store.create('person:A', 'Person').setValue('Private base detail', 'phoneNumber')
      store.getRoot().setValue('Private base session', 'sessionDetail')
    })
    const optimistic = environment.applyUpdate({
      storeUpdater: (store) => {
        const person = store.create('person:optimistic', 'Person')
        person.setValue('Private optimistic detail', 'phoneNumber')
        store.getRoot().setLinkedRecord(person, 'me')
      },
    })

    disposeEnvironment(environment)
    expect(environment.getStore().getSource().get('person:optimistic')).toBeNull()
    optimistic.dispose()

    expect(environment.getStore().getSource().get(ROOT_ID)).toBeUndefined()
    expect(environment.getStore().getSource().get('person:A')).toBeUndefined()
    expect(environment.getStore().getSource().get('person:optimistic')).toBeUndefined()
  })

  it('disposes the websocket client, and purges even when its disposal rejects', async () => {
    const environment = createEnvironment()
    environment.commitUpdate((store) => {
      store.create('person:A', 'Person').setValue('Private phone number', 'phoneNumber')
    })
    const subscriber = subscribe(environment)
    const client = createClientMock.mock.results[0]!.value as ReturnType<typeof createClient>
    const dispose = vi.spyOn(client, 'dispose').mockRejectedValue(new Error('handshake failed'))

    expect(() => disposeEnvironment(environment)).not.toThrow()

    expect(dispose).toHaveBeenCalledTimes(1)
    expect(environment.getStore().getSource().get('person:A')).toBeNull()
    await flushMicrotasks()
    subscriber.unsubscribe()
  })

  it('purges even when disposing the websocket client throws', async () => {
    const environment = createEnvironment()
    environment.commitUpdate((store) => {
      store.create('person:A', 'Person').setValue('Private phone number', 'phoneNumber')
    })
    const subscriber = subscribe(environment)
    const client = createClientMock.mock.results[0]!.value as ReturnType<typeof createClient>
    vi.spyOn(client, 'dispose').mockImplementation(() => {
      throw new Error('transport failure')
    })

    expect(() => disposeEnvironment(environment)).not.toThrow()

    expect(environment.getStore().getSource().get('person:A')).toBeNull()
    subscriber.unsubscribe()
    await flushMicrotasks()
  })

  it('opens a new websocket client for a subscription made after disposal', async () => {
    const environment = createEnvironment()
    subscribe(environment).unsubscribe()
    disposeEnvironment(environment)

    const subscriber = subscribe(environment)

    expect(createClientMock).toHaveBeenCalledTimes(2)
    subscriber.unsubscribe()
    disposeEnvironment(environment)
    await flushMicrotasks()
  })

  it('leaves other environments untouched', () => {
    const environment = createEnvironment()
    const otherEnvironment = createEnvironment()
    otherEnvironment.commitUpdate((store) => {
      store.create('person:B', 'Person').setValue('Other session detail', 'phoneNumber')
    })
    getCacheByEnvironment(otherEnvironment)?.set('other-query', {}, { data: {} })

    disposeEnvironment(environment)

    expect(otherEnvironment.getStore().getSource().get('person:B')).toBeTruthy()
    expect(getCacheByEnvironment(otherEnvironment)?.get('other-query', {})).not.toBeNull()
  })
})

describe('disposeEnvironment with requests in flight', () => {
  beforeEach(() => {
    baseAppFetchMock.mockReset()
  })

  it("drops a response that arrives after disposal, so a reused environment never holds the old session's data", async () => {
    const environment = createEnvironment()
    const response = deferred<unknown>()
    baseAppFetchMock.mockReturnValueOnce(response.promise as never)
    const onError = vi.fn()
    const onNext = vi.fn()
    fetchQuery(environment, MeQuery, {}).subscribe({ next: onNext, error: onError })

    disposeEnvironment(environment)
    response.resolve({ data: { me: { id: 'user:A', phone: 'A-private' } } })
    await flushMicrotasks()

    expect(onNext).not.toHaveBeenCalled()
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'EnvironmentDisposedError' }),
    )
    expect(onError).toHaveBeenCalledTimes(1)
    expect(environment.getStore().getSource().get('user:A')).toBeUndefined()
    expect(readMe(environment)?.me).toBeUndefined()
  })

  it('replaces an error that arrives after disposal', async () => {
    const environment = createEnvironment()
    const response = deferred<unknown>()
    baseAppFetchMock.mockReturnValueOnce(response.promise as never)
    const onError = vi.fn()
    fetchQuery(environment, MeQuery, {}).subscribe({ error: onError })

    disposeEnvironment(environment)
    response.reject(new Error('Old session failure for A-private'))
    await flushMicrotasks()

    expect(onError).toHaveBeenCalledTimes(1)
    expect(onError.mock.calls[0]![0]).toMatchObject({ name: 'EnvironmentDisposedError' })
  })

  it('fails requests in flight as soon as the environment is disposed', () => {
    const environment = createEnvironment()
    baseAppFetchMock.mockReturnValueOnce(deferred<unknown>().promise as never)
    const onError = vi.fn()
    fetchQuery(environment, MeQuery, {}).subscribe({ error: onError })

    expect(() => disposeEnvironment(environment)).not.toThrow()

    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'EnvironmentDisposedError' }),
    )
  })

  it('serves requests started after disposal, even the same query', async () => {
    const environment = createEnvironment()
    const oldResponse = deferred<unknown>()
    baseAppFetchMock
      .mockReturnValueOnce(oldResponse.promise as never)
      .mockResolvedValueOnce({ data: { me: { id: 'user:B', phone: 'B-private' } } } as never)
    fetchQuery(environment, MeQuery, {}).subscribe({ error: () => undefined })

    disposeEnvironment(environment)
    const onNext = vi.fn()
    fetchQuery(environment, MeQuery, {}).subscribe({ next: onNext })
    oldResponse.resolve({ data: { me: { id: 'user:A', phone: 'A-private' } } })
    await flushMicrotasks()

    expect(baseAppFetchMock).toHaveBeenCalledTimes(2)
    expect(onNext).toHaveBeenCalled()
    expect(readMe(environment)?.me).toEqual({ id: 'user:B', phone: 'B-private' })
    expect(environment.getStore().getSource().get('user:A')).toBeUndefined()
  })

  it('still delivers responses and errors of an environment that is not disposed', async () => {
    const environment = createEnvironment()
    baseAppFetchMock
      .mockResolvedValueOnce({ data: { me: { id: 'user:A', phone: 'A-private' } } } as never)
      .mockRejectedValueOnce(new Error('network down') as never)
    const onError = vi.fn()

    fetchQuery(environment, MeQuery, {}).subscribe({})
    await flushMicrotasks()
    fetchQuery(environment, MeQuery, {}, { fetchPolicy: 'network-only' }).subscribe({
      error: onError,
    })
    await flushMicrotasks()

    expect(readMe(environment)?.me).toEqual({ id: 'user:A', phone: 'A-private' })
    expect(onError).toHaveBeenCalledWith(expect.objectContaining({ message: 'network down' }))
  })
})
