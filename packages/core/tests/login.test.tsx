import { renderHook, act } from '@testing-library/react-hooks'
import { useLogin } from '../src/auth'
import { axiosMock, createWrapper } from './utils'
import { faker } from '@faker-js/faker'

describe('useSignUp', () => {
  test('should run onSuccess', async () => {
    let hasOnSuccessRan = false

    const { result, waitFor } = renderHook(
      () =>
        useLogin({
          defaultValues: {
            email: faker.internet.email(),
            password: faker.internet.password(),
          },
          onSuccess: (response: any, variables: any) => {
            hasOnSuccessRan = true
          },
        }),
      { wrapper: createWrapper() },
    )

    axiosMock.onPost('/login').reply(200, {
      token: 'fake cookie',
    })

    await act(async () => {
      await result.current.form.handleSubmit()
    })

    await waitFor(() => hasOnSuccessRan)

    expect(hasOnSuccessRan).toBe(true)
  })
})
