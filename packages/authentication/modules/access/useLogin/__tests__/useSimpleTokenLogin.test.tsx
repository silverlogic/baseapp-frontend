import { ComponentWithProviders, MockAdapter, renderHook } from '@baseapp-frontend/test'
import { TokenTypes, axios } from '@baseapp-frontend/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import useLogin from '../index'

// @ts-ignore TODO: (BA-1081) investigate AxiosRequestHeaders error
export const axiosMock = new MockAdapter(axios)

describe('useSimpleTokenLogin', () => {
  test('should run onSuccess', async () => {
    axiosMock.onPost('/auth/login').reply(200, {
      token: 'fake cookie',
    })

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
          tokenType: TokenTypes.simple,
        }),
      {
        wrapper: ComponentWithProviders,
      },
    )

    await result.current.form.handleSubmit()

    expect(hasOnSuccessRan).toBe(true)
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
