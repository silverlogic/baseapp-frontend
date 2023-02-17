import { act, renderHook } from '@testing-library/react-hooks'

import { useSignUp } from '../src/auth'
import { signupUser } from './fixtures'
import { axiosMock, createWrapper } from './utils'

describe('useSignUp', () => {
  test('should run onSuccess', async () => {
    let hasOnSuccessRan = false

    const { result, waitFor } = renderHook(
      () =>
        useSignUp({
          defaultValues: signupUser,
          onSuccess: (_response, _variables) => {
            hasOnSuccessRan = true
          },
        }),
      { wrapper: createWrapper() },
    )

    axiosMock.onPost('/register').reply(200, {
      email: signupUser.email,
    })

    await act(async () => {
      await result.current.form.handleSubmit()
    })

    await waitFor(() => hasOnSuccessRan)

    expect(hasOnSuccessRan).toBe(true)
  })
})
