/**
 * Contract tests for getActiveAuthModule and ActiveAuthModule.
 *
 * These tests define the expected behavior of the module resolver and active
 * module composition described in 02-contracts.md. They MUST FAIL until the
 * production implementation lands in WP1.
 *
 * Source contracts:
 *   - getActiveAuthModule()
 *   - ActiveAuthModule { strategy, session }
 */
import { getActiveAuthModule } from '../../modules/auth-strategy/factory'
import type { ActiveAuthModule, AuthStrategyId } from '../../modules/auth-strategy/types'

describe('getActiveAuthModule — contract', () => {
  const originalEnv = process.env

  beforeEach(() => {
    process.env = { ...originalEnv }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  it('returns the active module when strategy is allauth', () => {
    process.env.NEXT_PUBLIC_AUTH_STRATEGY = 'allauth'

    const activeModule: ActiveAuthModule = getActiveAuthModule('allauth')

    expect(activeModule).toBeDefined()
    expect(activeModule.strategy).toBeDefined()
    expect(activeModule.session).toBeDefined()
  })

  it('throws on unsupported strategy values', () => {
    expect(() => getActiveAuthModule('unsupported-strategy' as unknown as AuthStrategyId)).toThrow()
  })

  it('exposes the correct strategy id on the active module', () => {
    process.env.NEXT_PUBLIC_AUTH_STRATEGY = 'allauth'

    const activeModule = getActiveAuthModule('allauth')

    expect(activeModule.strategy.id).toBe('allauth')
  })

  it('composes a provider-owned session module with evaluate and refresh', () => {
    process.env.NEXT_PUBLIC_AUTH_STRATEGY = 'allauth'

    const activeModule = getActiveAuthModule('allauth')

    expect(typeof activeModule.session.evaluate).toBe('function')
    expect(typeof activeModule.session.refresh).toBe('function')
  })

  it('defaults to the configured strategy from env when no argument is passed', () => {
    process.env.NEXT_PUBLIC_AUTH_STRATEGY = 'allauth'

    const activeModule = getActiveAuthModule()

    expect(activeModule.strategy.id).toBe('allauth')
  })
})
