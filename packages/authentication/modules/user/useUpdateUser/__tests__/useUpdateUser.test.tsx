'use client'

import { ComponentWithProviders, mockFetch, renderHook, waitFor } from '@baseapp-frontend/test'

import type { UseMutationResult } from '@tanstack/react-query'

import useUpdateUser from '..'
import * as sessionClient from '../../../../session/client'
import type { User } from '../../../../types/user'
import { withAuthenticationTestProviders } from '../../../tests/utils'
import request from './fixtures/request.json'

const useQueryClientMock = jest.fn()

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: () => useQueryClientMock(),
}))

interface UseUpdateUserReturn<TUser> extends Omit<UseMutationResult<TUser, unknown>, 'data'> {
  user?: TUser
}

// TODO: BA-1308: improve tests
describe('useUpdateUser', () => {
  beforeAll(async () => {
    jest.useFakeTimers().setSystemTime(new Date(2020, 9, 1, 7))
  })

  it('should run custom onSettled on 401', async () => {
    const invalidateQueriesMock = jest.fn()
    useQueryClientMock.mockReturnValue({
      invalidateQueries: invalidateQueriesMock,
    })
    const refreshMock = jest.fn()
    jest.spyOn(sessionClient, 'getSessionService').mockReturnValue({
      read: () => ({ refreshToken: 'refresh-token' }),
      refresh: refreshMock,
    } as any)

    let hasOnSettledRan = false

    mockFetch('/users/1', {
      method: 'PATCH',
      status: 201,
      response: request,
    })

    const { result } = renderHook(
      () =>
        useUpdateUser<User>({
          options: {
            onSettled: () => {
              hasOnSettledRan = true
            },
          },
        }),
      {
        wrapper: withAuthenticationTestProviders(ComponentWithProviders),
      },
    )

    await result.current.mutateAsync({ userId: 1, data: { firstName: 'BB' } })

    await waitFor(() => expect(result.current.isPending).toBe(false))
    await waitFor(() => expect(hasOnSettledRan).toBe(true))
    expect(invalidateQueriesMock).toHaveBeenCalledTimes(2)
    expect(refreshMock).toHaveBeenCalledTimes(1)
  })
})
