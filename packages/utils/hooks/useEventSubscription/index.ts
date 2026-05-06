'use client'

import { useEffect } from 'react'

import { subscribeToBroadcastEvent } from '../../functions/events/broadcastEvent'
import { eventEmitter } from '../../functions/events/eventEmitter'

const useEventSubscription = (event: string, callback: (...args: any[]) => void) => {
  const unsubscribe = () => {
    eventEmitter.removeListener(event, callback)
  }

  useEffect(() => {
    eventEmitter.on(event, callback)
    // Cross-tab: BroadcastChannel posts deliver here for events emitted via broadcastEvent
    // in another same-origin tab. The local emitter above handles the dispatching tab.
    const unsubscribeBroadcast = subscribeToBroadcastEvent(event, (payload) => callback(payload))

    return () => {
      eventEmitter.removeListener(event, callback)
      unsubscribeBroadcast()
    }
  }, [])

  return unsubscribe
}

export default useEventSubscription
