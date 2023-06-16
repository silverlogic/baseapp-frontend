import { ComponentWithProviders, axiosMock, renderHook, waitFor } from '@baseapp-frontend/test'

import { IRegisterRequest } from '../../../../types/auth'
import useSignUp from '../index'
import request from './fixtures/request.json'

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
})