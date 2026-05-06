'use client'

import { eventEmitter } from '../eventEmitter'

const channelName = (event: string) => `baseapp:event:${event}`

/**
 * Emit an event locally (via `eventEmitter`) and post it on a same-named BroadcastChannel
 * so subscribers in other same-origin tabs receive it too. Use this for events whose
 * effects should propagate across tabs — logout, login, profile switch, etc.
 */
export const broadcastEvent = (event: string, payload?: unknown) => {
  if (payload === undefined) eventEmitter.emit(event)
  else eventEmitter.emit(event, payload)

  if (typeof BroadcastChannel === 'undefined') return
  const channel = new BroadcastChannel(channelName(event))
  channel.postMessage(payload ?? null)
  channel.close()
}

/**
 * Subscribe to cross-tab broadcasts of `event`. Returns an unsubscribe function. No-op on
 * environments without `BroadcastChannel` (older Node, very old browsers).
 */
export const subscribeToBroadcastEvent = (
  event: string,
  callback: (payload: unknown) => void,
): (() => void) => {
  if (typeof BroadcastChannel === 'undefined') return () => {}
  const channel = new BroadcastChannel(channelName(event))
  channel.onmessage = (e) => callback(e.data)
  return () => channel.close()
}
