import { faker } from '@faker-js/faker'
import { act, renderHook } from '@testing-library/react-hooks'

import { useLogin } from '../src/auth'
import { axiosMock, createWrapper } from './utils'

describe('useLogin', () => {
  test('should run onSuccess', async () => {
    let hasOnSuccessRan = false

    const { result, waitFor } = renderHook(
      () =>
        useLogin({
          defaultValues: {
            email: faker.internet.email(),
            password: faker.internet.password(),
          },
          onSuccess: (_response: any, _variables: any) => {
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
