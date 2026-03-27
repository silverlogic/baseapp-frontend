import { ComponentWithProviders, renderHook, waitFor } from '@baseapp-frontend/test'

import * as sessionClient from '../../../../session/client'
import type { User } from '../../../../types/user'
import { SESSION_STATUS } from '../../../auth-strategy/constants'
import type { SessionState } from '../../../auth-strategy/types'
import { withAuthenticationTestProviders } from '../../../tests/utils'

describe('useSession', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  it('preserves the user while a recoverable session is expired', async () => {
    jest.spyOn(sessionClient, 'getSessionService').mockReturnValue({
      getState: jest.fn().mockResolvedValue({
        status: SESSION_STATUS.expired,
        user: {
          id: 1,
          email: 'user@company.com',
        },
        session: {
          accessToken: 'expired-access',
          refreshToken: 'refresh-token',
          sessionToken: null,
        },
      } satisfies SessionState<Partial<User>>),
      refresh: jest.fn(),
    } as any)

    const { useSession } = await import('../index')

    const { result } = renderHook(() => useSession<Partial<User>>(), {
      wrapper: withAuthenticationTestProviders(ComponentWithProviders),
    })

    await waitFor(() => expect(result.current.isRefreshing).toBe(true))

    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.user?.email).toBe('user@company.com')
  })
})
