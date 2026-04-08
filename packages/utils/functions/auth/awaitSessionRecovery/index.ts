import {
  AUTH_SESSION_CLEARED,
  AUTH_SESSION_REFRESHED,
  AUTH_UNAUTHORIZED_EVENT,
} from '../../../constants/events'
import { eventEmitter } from '../../events'

type UnauthorizedSource = 'fetch' | 'axios'
type UnauthorizedResolution = 'refreshed' | 'cleared' | 'timeout'
type UnauthorizedStatus = 200 | 401

interface AwaitSessionRecoveryInput {
  source: UnauthorizedSource
  path?: string
  status: UnauthorizedStatus
  hasRefreshToken: boolean
  requestId?: string
  timeoutMs?: number
}

let inflightRecovery: Promise<UnauthorizedResolution> | null = null

export function awaitSessionRecovery({
  timeoutMs = 5000,
  ...event
}: AwaitSessionRecoveryInput): Promise<UnauthorizedResolution> {
  if (inflightRecovery) {
    return inflightRecovery
  }

  inflightRecovery = new Promise<UnauthorizedResolution>((resolve) => {
    let timeoutId: ReturnType<typeof setTimeout>
    let onRefreshed = () => {}
    let onCleared = () => {}

    function cleanup() {
      clearTimeout(timeoutId)
      eventEmitter.removeListener(AUTH_SESSION_REFRESHED, onRefreshed)
      eventEmitter.removeListener(AUTH_SESSION_CLEARED, onCleared)
    }

    timeoutId = setTimeout(() => {
      cleanup()
      resolve('timeout')
    }, timeoutMs)

    onRefreshed = () => {
      cleanup()
      resolve('refreshed')
    }

    onCleared = () => {
      cleanup()
      resolve('cleared')
    }

    eventEmitter.on(AUTH_SESSION_REFRESHED, onRefreshed)
    eventEmitter.on(AUTH_SESSION_CLEARED, onCleared)
    eventEmitter.emit(AUTH_UNAUTHORIZED_EVENT, {
      type: AUTH_UNAUTHORIZED_EVENT,
      ...event,
    })
  }).finally(() => {
    inflightRecovery = null
  })

  return inflightRecovery
}
