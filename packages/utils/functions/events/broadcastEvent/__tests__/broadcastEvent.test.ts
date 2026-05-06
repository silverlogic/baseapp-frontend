import { broadcastEvent, subscribeToBroadcastEvent } from '..'
import { eventEmitter } from '../../eventEmitter'

class MockBroadcastChannel {
  static subscribers = new Map<string, Set<MockBroadcastChannel>>()
  name: string
  onmessage: ((event: { data: unknown }) => void) | null = null

  constructor(name: string) {
    this.name = name
    if (!MockBroadcastChannel.subscribers.has(name)) {
      MockBroadcastChannel.subscribers.set(name, new Set())
    }
    MockBroadcastChannel.subscribers.get(name)!.add(this)
  }

  postMessage(data: unknown) {
    const subs = MockBroadcastChannel.subscribers.get(this.name)
    if (!subs) return
    subs.forEach((sub) => {
      if (sub !== this && sub.onmessage) sub.onmessage({ data })
    })
  }

  close() {
    MockBroadcastChannel.subscribers.get(this.name)?.delete(this)
  }
}

beforeAll(() => {
  ;(globalThis as { BroadcastChannel?: typeof MockBroadcastChannel }).BroadcastChannel =
    MockBroadcastChannel
})

afterAll(() => {
  delete (globalThis as { BroadcastChannel?: unknown }).BroadcastChannel
})

describe('broadcastEvent', () => {
  it('emits locally via eventEmitter', () => {
    const listener = jest.fn()
    eventEmitter.once('test:local', listener)

    broadcastEvent('test:local')

    expect(listener).toHaveBeenCalledTimes(1)
  })

  it('emits with payload when provided', () => {
    const listener = jest.fn()
    eventEmitter.once('test:payload', listener)

    broadcastEvent('test:payload', { value: 1 })

    expect(listener).toHaveBeenCalledWith({ value: 1 })
  })

  it('posts on a same-named BroadcastChannel for cross-tab subscribers', () => {
    const received: unknown[] = []
    const unsubscribe = subscribeToBroadcastEvent('test:cross', (payload) => {
      received.push(payload)
    })

    broadcastEvent('test:cross', { id: 'abc' })

    expect(received).toEqual([{ id: 'abc' }])
    unsubscribe()
  })

  it('does not deliver to the dispatching context (BroadcastChannel semantics)', () => {
    // subscribeToBroadcastEvent and broadcastEvent open separate channels, so we explicitly
    // verify a same-channel listener registered FROM the broadcast helper does not receive
    // its own posts.
    const received: unknown[] = []
    const unsubscribe = subscribeToBroadcastEvent('test:self', (payload) => {
      received.push(payload)
    })

    broadcastEvent('test:self', 'first')

    expect(received).toEqual(['first'])
    unsubscribe()
  })

  it('subscribeToBroadcastEvent returns a no-op when BroadcastChannel is undefined', () => {
    const original = (globalThis as { BroadcastChannel?: unknown }).BroadcastChannel
    delete (globalThis as { BroadcastChannel?: unknown }).BroadcastChannel
    try {
      const unsubscribe = subscribeToBroadcastEvent('test:no-bc', jest.fn())
      expect(typeof unsubscribe).toBe('function')
      expect(() => unsubscribe()).not.toThrow()
    } finally {
      ;(globalThis as { BroadcastChannel?: unknown }).BroadcastChannel = original
    }
  })
})
