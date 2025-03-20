import {
  ComponentWithProviders,
  mockFetch,
  mockFetchError,
  renderHook,
  waitFor,
} from '@baseapp-frontend/test'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import type { RegisterRequest } from '../../../../types/auth'
import useSignUp from '../index'
import request from './fixtures/request.json'

describe('useSignUp', () => {
  const registerUrl = '/register'

  afterEach(() => {
    ;(global.fetch as jest.Mock).mockClear()
  })

  test('should run onSuccess', async () => {
    mockFetch(registerUrl, {
      method: 'POST',
      status: 200,
      response: {
        email: request.email,
      },
    })

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useSignUp({
          formOptions: {
            defaultValues: request,
          },
          useNameField: true,
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

  test('should run onSuccess with first and last name field', async () => {
    mockFetch(registerUrl, {
      method: 'POST',
      status: 200,
      response: {
        email: request.email,
      },
    })

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useSignUp({
          formOptions: {
            defaultValues: {
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.doe@example.com',
              password: 'password',
            },
          },
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

    mockFetch(registerUrl, {
      method: 'POST',
      status: 200,
      response: customRequest,
    })

    interface CustomRegisterRequest extends RegisterRequest {
      customField: number
    }

    interface CustomRegisterResponse {
      name: string
    }

    const { result } = renderHook(
      () =>
        useSignUp<CustomRegisterRequest, CustomRegisterResponse>({
          formOptions: {
            defaultValues: customRequest,
          },
          useNameField: true,
        }),
      {
        wrapper: ComponentWithProviders,
      },
    )
    result.current.form.handleSubmit()
    await waitFor(() => expect(result.current.mutation.isSuccess).toBeTruthy())

    expect(result.current.mutation.data).toStrictEqual(customRequest)
  })

  test('should run onError', async () => {
    mockFetchError(registerUrl, {
      method: 'POST',
      status: 500,
      error: 'any',
    })

    let hasOnErrorRan = false

    const { result } = renderHook(
      () =>
        useSignUp({
          formOptions: {
            defaultValues: request,
          },
          useNameField: true,
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
    mockFetch(registerUrl, {
      method: 'POST',
      status: 200,
      response: {},
    })

    const customDefaultValues = {
      email: 'test@tsl.io',
      password: 'fW7q0jwv',
    }

    const customValidationSchema = z.object({
      password: z.string().min(1),
      email: z.string().min(1).email(),
    })

    let hasOnSuccessRan = false

    interface CustomRegisterRequest extends Pick<RegisterRequest, 'email' | 'password'> {}

    const { result } = renderHook(
      () =>
        useSignUp<CustomRegisterRequest>({
          formOptions: {
            defaultValues: customDefaultValues,
            resolver: zodResolver(customValidationSchema),
          },
          useNameField: true,
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
