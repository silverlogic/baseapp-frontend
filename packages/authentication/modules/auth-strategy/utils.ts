import { DEFAULT_AUTH_STRATEGY } from './constants'
import type { AuthStrategyId } from './types'

export function getActiveStrategyId(): AuthStrategyId {
  return (
    (process.env.NEXT_PUBLIC_AUTH_STRATEGY as AuthStrategyId | undefined) ?? DEFAULT_AUTH_STRATEGY
  )
}
