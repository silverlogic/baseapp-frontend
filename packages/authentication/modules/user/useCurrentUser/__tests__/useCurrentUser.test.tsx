import {
  ComponentWithProviders,
  mockFetch,
  mockFetchError,
  renderHook,
  waitFor,
} from '@baseapp-frontend/test'

import type { UseQueryResult } from '@tanstack/react-query'

import type { User } from '../../../../types/user'
import { withAuthenticationTestProviders } from '../../../tests/utils'
import type { UseCurrentUserOptions } from '../types'
import request from './fixtures/request.json'

interface UseCurrentUserReturn<TUser> extends Omit<UseQueryResult<TUser, unknown>, 'data'> {
  user?: TUser | null
}

const useSessionMock = jest.fn()
const useQueryClientMock = jest.fn()

jest.mock('../../useSession', () => ({
  useSession: (...args: unknown[]) => useSessionMock(...args),
}))

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: () => useQueryClientMock(),
}))

describe('useCurrentUser', () => {
  let useCurrentUser: <TUser extends Partial<User>>(
    props?: UseCurrentUserOptions<TUser>,
  ) => UseCurrentUserReturn<TUser>

  beforeAll(async () => {
    // @ts-ignore test import
    useCurrentUser = (await import('../index')).default as any
  })

  afterEach(() => {
    ;(global.fetch as jest.Mock).mockClear()
    jest.clearAllMocks()
  })

  it(`should call the user's endpoint and prefer the latest backend user data`, async () => {
    useSessionMock.mockReturnValue({
      user: {
        id: 1,
        email: 'placeholder@tsl.io',
      },
      isAuthenticated: true,
    })
    useQueryClientMock.mockReturnValue({ resetQueries: jest.fn() })

    mockFetch('/users/me', {
      method: 'GET',
      status: 200,
      response: { ...request },
    })

    const { result } = renderHook(() => useCurrentUser(), {
      wrapper: withAuthenticationTestProviders(ComponentWithProviders),
    })

    await waitFor(() => expect(result.current.user?.email).toBe(request.email))
  })

  it('should reset the current-user query on 401', async () => {
    const resetQueriesMock = jest.fn()

    useSessionMock.mockReturnValue({
      user: {
        id: 1,
        email: 'placeholder@tsl.io',
      },
      isAuthenticated: true,
    })
    useQueryClientMock.mockReturnValue({ resetQueries: resetQueriesMock })

    mockFetchError('/users/me', {
      method: 'GET',
      status: 401,
      error: 'Unauthorized',
    })

    const { result } = renderHook(
      () =>
        useCurrentUser({
          options: {
            retry: false,
          },
        }),
      {
        wrapper: withAuthenticationTestProviders(ComponentWithProviders),
      },
    )

    await waitFor(() => expect(result.current.isPending).toBe(false))
    await waitFor(() => expect(result.current.isLoading).toBe(false))
    await waitFor(() =>
      expect(resetQueriesMock).toHaveBeenCalledWith({
        queryKey: ['user', 'getUser'],
      }),
    )
  })
})
