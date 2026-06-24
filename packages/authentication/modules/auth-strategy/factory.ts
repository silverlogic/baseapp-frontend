import { ALLAUTH_STRATEGY_ID, createAllauthSession, createAllauthStrategy } from './allauth'
import { SUPPORTED_STRATEGIES } from './constants'
import type { ActiveAuthModule, AuthStrategyId } from './types'
import { getActiveStrategyId } from './utils'

function resolveActiveModule(strategyId: AuthStrategyId): ActiveAuthModule {
  switch (strategyId) {
    case ALLAUTH_STRATEGY_ID:
      return {
        strategy: createAllauthStrategy(),
        session: createAllauthSession(),
      }
    default:
      throw new Error(`Unsupported auth strategy: "${strategyId}"`)
  }
}

export function getActiveAuthModule(strategy?: AuthStrategyId): ActiveAuthModule {
  const strategyId = strategy ?? getActiveStrategyId()

  if (!SUPPORTED_STRATEGIES.has(strategyId)) {
    throw new Error(
      `Unsupported auth strategy: "${strategyId}". Supported: ${[...SUPPORTED_STRATEGIES].join(', ')}`,
    )
  }

  return resolveActiveModule(strategyId)
}
