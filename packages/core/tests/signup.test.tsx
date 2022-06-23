import { renderHook, act } from '@testing-library/react-hooks'
import { useSignUp } from '../src/auth'
import { axiosMock, createWrapper } from './utils'

describe('useSignUp', () => {
  test('should run onSuccess', async () => {
    let hasOnSuccessRan = false

    const { result, waitFor } = renderHook(
      () =>
        useSignUp({
          initialValues: {
            firstName: 'A',
            lastName: 'P',
            email: 'ap@tsl.io',
            password: 'secret',
            phoneNumber: '5615692366',
            acceptConsent: true,
          },
          onSuccess: (response: any, variables: any) => {
            hasOnSuccessRan = true
          },
        }),
      { wrapper: createWrapper() },
    )

    axiosMock.onPost('/register').reply(200, {
      email: 'ap@tsl.io',
    })

    await act(async () => {
      await result.current.formik.submitForm()
    })

    await waitFor(() => hasOnSuccessRan)

    expect(hasOnSuccessRan).toBe(true)
  })
})
