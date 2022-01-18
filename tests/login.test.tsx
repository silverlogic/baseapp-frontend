import { renderHook, act } from '@testing-library/react-hooks'
import { useLogin } from '../src/auth'
import { axiosMock, createWrapper } from './utils'

describe('useSignUp', () => {
  test('should run onSuccess', async () => {
    let hasOnSuccessRan = false

    const { result, waitFor } = renderHook(() => useLogin({
      initialValues: {
        email: 'ap@tsl.io',
        password: 'secret',
      },
      onSuccess: (response: any, variables: any) => {
        hasOnSuccessRan = true
      }
    }), { wrapper: createWrapper() })

    axiosMock.onPost('/login').reply(200, {
      token: "fake cookie"
    });

    await act(async () => {
      await result.current.formik.submitForm()
    })

    await waitFor(() => hasOnSuccessRan);

    expect(hasOnSuccessRan).toBe(true)
  })
})