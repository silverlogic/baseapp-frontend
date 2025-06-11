'use client'

import {
  ComponentWithProviders,
  type CookiesGetByNameFn,
  mockFetch,
  renderHook,
  waitFor,
} from '@baseapp-frontend/test'

import type { UseMutationResult } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import useUpdateUser from '..'
import type { User } from '../../../../types/user'
import { withAuthenticationTestProviders } from '../../../tests/utils'
import request from './fixtures/request.json'

interface UseUpdateUserReturn<TUser> extends Omit<UseMutationResult<TUser, unknown>, 'data'> {
  user?: TUser
}

// TODO: BA-1308: improve tests
describe('useUpdateUser', () => {
  const decodeJWTMock = jest.fn()
  const refreshAccessTokenMock = jest.fn()
  jest.mock('@baseapp-frontend/utils', () => ({
    ...jest.requireActual('@baseapp-frontend/utils'),
    decodeJWT: decodeJWTMock,
    refreshAccessToken: refreshAccessTokenMock,
  }))

  const useQueryClientMock = jest.fn()
  jest.mock('@tanstack/react-query', () => ({
    ...jest.requireActual('@tanstack/react-query'),
    useQueryClient: useQueryClientMock,
  }))

  beforeAll(async () => {
    jest.useFakeTimers().setSystemTime(new Date(2020, 9, 1, 7))
  })

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzA5NjcxNjgzLCJpYXQiOjE3MDk2NjA3MTIsImp0aSI6IjhmMjg3ZGNhODVjODRjOTVhOThkZThmN2NiZTllNTE5IiwidXNlcl9pZCI6MSwiaWQiOjEsImVtYWlsIjoiYWFAdHNsLmlvIiwiaXNfZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuZXdfZW1haWwiOiIiLCJpc19uZXdfZW1haWxfY29uZmlybWVkIjpmYWxzZSwicmVmZXJyYWxfY29kZSI6IiIsImF2YXRhciI6eyJmdWxsX3NpemUiOiIvbWVkaWEvdXNlci1hdmF0YXJzLzUvNi8xL3Jlc2l6ZWQvMTAyNC8xMDI0LzU0NGNhNDA2YWUxMWJhYzVjNDk3NTlhMjQwN2ZkY2JlLnBuZyIsInNtYWxsIjoiL21lZGlhL3VzZXItYXZhdGFycy81LzYvMS9yZXNpemVkLzY0LzY0LzU0NGNhNDA2YWUxMWJhYzVjNDk3NTlhMjQwN2ZkY2JlLnBuZyJ9LCJmaXJzdF9uYW1lIjoiYWEiLCJsYXN0X25hbWUiOiJUZXN0In0.zmTBh3Iz6iRGTiV84o7r4JMA3AU4Q4bVbN76ZUwm5Jg'

  it('should run custom onSettled on 401', async () => {
    ;(Cookies.get as CookiesGetByNameFn) = jest.fn(() => token)
    decodeJWTMock.mockImplementation(() => undefined)
    const invalidateQueriesMock = jest.fn()
    useQueryClientMock.mockImplementation(() => ({ invalidateQueries: invalidateQueriesMock }))

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
  })
})
