import {
  ComponentWithProviders,
  MockAdapter,
  cookiesMock,
  renderHook,
} from '@baseapp-frontend/test'
import { axios } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import useLogin from '../index'

// @ts-ignore TODO: (BA-1081) investigate AxiosRequestHeaders error
export const axiosMock = new MockAdapter(axios)

describe('useLogin', () => {
  test('should run onSuccess', async () => {
    axiosMock.onPost('/auth/login').reply(200, {
      token: 'fake token',
    })
    cookiesMock.set.mockImplementation((cookieName: string) => cookieName)

    const email = 'test@tsl.io'
    const password = '123456789'

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useLogin({
          loginFormOptions: {
            defaultValues: {
              email,
              password,
            },
          },
          loginOptions: {
            onSuccess: () => {
              hasOnSuccessRan = true
            },
          },
        }),
      {
        wrapper: ComponentWithProviders,
      },
    )

    await result.current.form.handleSubmit()

    expect(hasOnSuccessRan).toBe(true)
    expect(cookiesMock.set).toBeCalledTimes(2)
  })

  test('should allow custom defaultValues and validationSchema', async () => {
    axiosMock.onPost('/auth/login').reply(200, {})

    const customDefaultValues = {
      email: 'test@tsl.io',
      password: 'fW7q0jwv',
    }
    const customValidationSchema = z.object({
      password: z.string().nonempty(),
      email: z.string().nonempty().email(),
    })

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useLogin({
          loginFormOptions: {
            defaultValues: customDefaultValues,
            resolver: zodResolver(customValidationSchema),
          },
          loginOptions: {
            onSuccess: () => {
              hasOnSuccessRan = true
            },
          },
        }),
      {
        wrapper: ComponentWithProviders,
      },
    )

    await result.current.form.handleSubmit()

    expect(hasOnSuccessRan).toBe(true)
  })
})
