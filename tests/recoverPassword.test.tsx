import { useRecoverPassword } from '../src/auth'
import { axiosMock, createWrapper } from './utils'
import { renderHook, act } from '@testing-library/react-hooks'

describe('useRecoverPassword', () => {
  test('should run onSuccess', async () => {
    let hasOnSuccessRan = false

    const { result, waitFor } = renderHook(
      () =>
        useRecoverPassword({
          initialValues: {
            email: 'ap@tsl.io',
          },
          onSuccess: (response: any, variables: any) => {
            hasOnSuccessRan = true
          },
        }),
      { wrapper: createWrapper() },
    )

    axiosMock.onPost('/forgot-password').reply(200, {
      email: 'aps@tsl.io',
    })

    await act(async () => {
      await result.current.formik.submitForm()
    })

    await waitFor(() => hasOnSuccessRan)

    expect(hasOnSuccessRan).toBe(true)
  })

  test('should run onError', async () => {
    let hasOnErrorRan = false

    const { result, waitFor } = renderHook(
      () =>
        useRecoverPassword({
          initialValues: {
            email: 'ap@tsl.io',
          },
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
      await result.current.formik.submitForm()
    })

    await waitFor(() => hasOnErrorRan)

    expect(hasOnErrorRan).toBe(true)
  })
})
