import { ComponentWithProviders, MockAdapter, renderHook, waitFor } from '@baseapp-frontend/test'
import { axios } from '@baseapp-frontend/utils'

import { z } from 'zod'

import { IRegisterRequest } from '../../../../types/auth'
import useSignUp from '../index'
import request from './fixtures/request.json'

// @ts-ignore TODO: (BA-1081) investigate AxiosRequestHeaders error
export const axiosMock = new MockAdapter(axios)

describe('useSignUp', () => {
  test('should run onSuccess', async () => {
    axiosMock.onPost('/register').reply(200, {
      email: request.email,
    })

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useSignUp({
          defaultValues: request,
          options: {
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

  test('can use a custom type interface', async () => {
    const customRequest = { ...request, customField: 123 }
    axiosMock.onPost('/register').reply(200, customRequest)

    interface ICustomRegisterRequest extends IRegisterRequest {
      customField: number
    }

    interface ICustomRegisterResponse {
      name: string
    }

    const { result } = renderHook(
      () =>
        useSignUp<ICustomRegisterRequest, ICustomRegisterResponse>({
          defaultValues: customRequest,
        }),
      {
        wrapper: ComponentWithProviders,
      },
    )
    // call the submit function
    result.current.form.handleSubmit()
    await waitFor(() => expect(result.current.mutation.isSuccess).toBeTruthy())

    expect(result.current.mutation.data).toStrictEqual(customRequest)
  })

  test('should run onError', async () => {
    axiosMock.onPost('/register').reply(500, {
      error: 'any',
    })

    let hasOnErrorRan = false

    const { result } = renderHook(
      () =>
        useSignUp({
          defaultValues: request,
          options: {
            onError: () => {
              hasOnErrorRan = true
            },
          },
        }),
      {
        wrapper: ComponentWithProviders,
      },
    )

    await result.current.form.handleSubmit()

    expect(hasOnErrorRan).toBe(true)
  })

  test('should allow custom defaultValues and validationSchema', async () => {
    axiosMock.onPost('/register').reply(200, {})

    const customDefaultValues = {
      email: 'test@tsl.io',
      phoneNumber: '12345',
      password: 'fW7q0jwv',
    }
    const customValidationSchema = z.object({
      password: z.string().nonempty(),
      phoneNumber: z
        .string()
        .nonempty()
        .regex(/^\d{5}$/),
      email: z.string().nonempty().email(),
    })

    let hasOnSuccessRan = false

    interface ICustomRegisterRequest
      extends Pick<IRegisterRequest, 'email' | 'password' | 'phoneNumber'> {}

    const { result } = renderHook(
      () =>
        useSignUp<ICustomRegisterRequest>({
          defaultValues: customDefaultValues,
          validationSchema: customValidationSchema,
          options: {
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
