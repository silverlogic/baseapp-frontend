import { useRecoverPassword } from '../src/auth'
import { axiosMock, createWrapper } from './utils'
import { renderHook, act } from '@testing-library/react-hooks'
import { faker } from '@faker-js/faker'

describe('useRecoverPassword', () => {
  test('should run onSuccess', async () => {
    let hasOnSuccessRan = false
    const email = faker.internet.email()

    const { result, waitFor } = renderHook(
      () =>
        useRecoverPassword({
          defaultValues: {email},
          onSuccess: (response: any, variables: any) => {
            hasOnSuccessRan = true
          },
        }),
      { wrapper: createWrapper() },
    )

    axiosMock.onPost('/forgot-password').reply(200, { email })

    await act(async () => {
      await result.current.form.handleSubmit()
    })

    await waitFor(() => hasOnSuccessRan)

    expect(hasOnSuccessRan).toBe(true)
  })

  test('should run onError', async () => {
    let hasOnErrorRan = false
    const email = faker.internet.email()

    const { result, waitFor } = renderHook(
      () =>
        useRecoverPassword({
          defaultValues: {email},
          onError: (response: any, variables: any) => {
            hasOnErrorRan = true
          },
        }),
      { wrapper: createWrapper() },
    )

    axiosMock.onPost('/forgot-password').reply(500, {
      error: 'any',
    })

    await act(async () => {
      await result.current.form.handleSubmit()
    })

    await waitFor(() => hasOnErrorRan)

    expect(hasOnErrorRan).toBe(true)
  })
})
