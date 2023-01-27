import { renderHook, act } from '@testing-library/react-hooks'
import { useSignUp } from '../src/auth'
import { axiosMock, createWrapper } from './utils'
import { faker } from '@faker-js/faker'

describe('useSignUp', () => {
  test('should run onSuccess', async () => {
    let hasOnSuccessRan = false
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      acceptConsent: true,
    }

    const { result, waitFor } = renderHook(
      () =>
        useSignUp({
          defaultValues: user,
          onSuccess: (response: any, variables: any) => {
            hasOnSuccessRan = true
          },
        }),
      { wrapper: createWrapper() },
    )

    axiosMock.onPost('/register').reply(200, {
      email: user.email,
    })

    await act(async () => {
      await result.current.form.handleSubmit()
    })

    await waitFor(() => hasOnSuccessRan)

    expect(hasOnSuccessRan).toBe(true)
  })
})
