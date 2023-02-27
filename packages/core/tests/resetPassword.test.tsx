import { faker } from '@faker-js/faker'
import { act, renderHook } from '@testing-library/react-hooks'

import { useResetPassword } from '../src/auth'
import { axiosMock, createWrapper } from './utils'

describe('useResetPassword', () => {
  test('should run onSuccess', async () => {
    let hasOnSuccessRan = false
    const password = faker.internet.password()

    const { result, waitFor } = renderHook(
      () =>
        useResetPassword({
          defaultValues: {
            newPassword: password,
            token: 'any_token',
          },
          onSuccess: (_response: any, _variables: any) => {
            hasOnSuccessRan = true
          },
        }),
      { wrapper: createWrapper() },
    )

    axiosMock.onPost('/forgot-password/reset').reply(200, {
      newPassword: password,
      token: 'any_token',
    })

    await act(async () => {
      await result.current.form.handleSubmit()
    })

    await waitFor(() => hasOnSuccessRan)

    expect(hasOnSuccessRan).toBe(true)
  })

  test('should run onError', async () => {
    let hasOnErrorRan = false
    const password = faker.internet.password()

    const { result, waitFor } = renderHook(
      () =>
        useResetPassword({
          defaultValues: {
            newPassword: password,
            token: 'any_token',
          },
          onError: (_response: any, _variables: any) => {
            hasOnErrorRan = true
          },
        }),
      { wrapper: createWrapper() },
    )

    axiosMock.onPost('/forgot-password/reset').reply(500, {
      error: 'any',
    })

    await act(async () => {
      await result.current.form.handleSubmit()
    })

    await waitFor(() => hasOnErrorRan)

    expect(hasOnErrorRan).toBe(true)
  })
})
