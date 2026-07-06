import { ComponentWithProviders, renderHook, waitFor } from '@baseapp-frontend/test'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import type { RegisterRequest } from '../../../../types/auth'
import type { AuthResult } from '../../../auth-strategy/types'
import { withAuthenticationTestProviders } from '../../../tests/utils'
import useSignUp from '../index'
import request from './fixtures/request.json'

const mockSignUp = jest.fn()

jest.mock('../../../auth-strategy/factory', () => ({
  getActiveAuthModule: () => ({
    strategy: {
      signUp: mockSignUp,
    },
  }),
}))

const successResult: AuthResult = {
  kind: 'success',
  rawResponse: { email: request.email },
  metadata: { rawResponse: { email: request.email } },
}

describe('useSignUp', () => {
  afterEach(() => {
    mockSignUp.mockReset()
  })

  test('should call strategy.signUp and run onSuccess', async () => {
    mockSignUp.mockResolvedValueOnce(successResult)

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
        wrapper: withAuthenticationTestProviders(ComponentWithProviders),
      },
    )

    await result.current.form.handleSubmit()

    expect(mockSignUp).toHaveBeenCalled()
    expect(hasOnSuccessRan).toBe(true)
  })

  test('should run onSuccess with first and last name field', async () => {
    mockSignUp.mockResolvedValueOnce(successResult)

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useSignUp({
          formOptions: {
            defaultValues: {
              firstName: 'John',
              lastName: 'Doe',
              email: 'john.doe@example.com',
              password: '#F12W7q0jwv525',
            },
          },
          options: {
            onSuccess: () => {
              hasOnSuccessRan = true
            },
          },
        }),
      {
        wrapper: withAuthenticationTestProviders(ComponentWithProviders),
      },
    )

    await result.current.form.handleSubmit()

    expect(hasOnSuccessRan).toBe(true)
  })

  test('can use a custom type interface', async () => {
    const customRequest = { ...request, customField: 123 }
    const customResult: AuthResult = {
      kind: 'success',
      rawResponse: customRequest,
      metadata: { rawResponse: customRequest },
    }
    mockSignUp.mockResolvedValueOnce(customResult)

    interface CustomRegisterRequest extends RegisterRequest {
      customField: number
    }

    const { result } = renderHook(
      () =>
        useSignUp<CustomRegisterRequest>({
          formOptions: {
            defaultValues: customRequest,
          },
          useNameField: true,
        }),
      {
        wrapper: withAuthenticationTestProviders(ComponentWithProviders),
      },
    )
    result.current.form.handleSubmit()
    await waitFor(() => expect(result.current.mutation.isSuccess).toBeTruthy())

    expect(result.current.mutation.data).toMatchObject({ kind: 'success' })
    expect((result.current.mutation.data as any)?.rawResponse).toStrictEqual(customRequest)
  })

  test('should run onError when strategy rejects', async () => {
    mockSignUp.mockRejectedValueOnce({
      code: 'validation_error',
      message: 'Email already in use',
      fieldErrors: { email: ['Email already in use'] },
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
        wrapper: withAuthenticationTestProviders(ComponentWithProviders),
      },
    )

    await result.current.form.handleSubmit()

    expect(hasOnErrorRan).toBe(true)
  })

  test('should allow custom defaultValues and validationSchema', async () => {
    mockSignUp.mockResolvedValueOnce(successResult)

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
            // @ts-ignore TODO: Fix typing for zodResolver
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
        wrapper: withAuthenticationTestProviders(ComponentWithProviders),
      },
    )

    await result.current.form.handleSubmit()

    expect(hasOnSuccessRan).toBe(true)
  })
})
