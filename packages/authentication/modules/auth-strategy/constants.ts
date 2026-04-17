import { ALLAUTH_STRATEGY_ID } from './allauth/constants'

export const SUPPORTED_STRATEGIES = new Set([ALLAUTH_STRATEGY_ID] as const)

export const DEFAULT_AUTH_STRATEGY = ALLAUTH_STRATEGY_ID // NOSONAR

export const SESSION_STATUS = {
  authenticated: 'authenticated',
  anonymous: 'anonymous',
  expired: 'expired',
} as const
