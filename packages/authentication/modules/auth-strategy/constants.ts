import { ALLAUTH_STRATEGY_ID } from './allauth/constants'
import type { AuthStrategyId } from './types'

export const SUPPORTED_STRATEGIES: ReadonlySet<AuthStrategyId> = new Set([ALLAUTH_STRATEGY_ID])

export const DEFAULT_AUTH_STRATEGY: AuthStrategyId = ALLAUTH_STRATEGY_ID

export const SESSION_STATUS = {
  authenticated: 'authenticated',
  anonymous: 'anonymous',
  expired: 'expired',
} as const
