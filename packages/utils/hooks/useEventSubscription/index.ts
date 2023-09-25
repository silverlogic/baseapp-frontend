import { useEffect } from 'react'

import { eventEmitter } from '../../functions/events'

export const useEventSubscription = (event: string, callback: (...args: any[]) => void) => {
  const unsubscribe = () => {
    eventEmitter.removeListener(event, callback)
  }

  useEffect(() => {
    eventEmitter.on(event, callback)
    return unsubscribe
  }, [])

  return unsubscribe
}
