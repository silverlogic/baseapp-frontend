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
  const registerUrl = '/_allauth/app/v1/auth/signup'

  afterEach(() => {
    ;(global.fetch as jest.Mock).mockClear()
  })

  test('should run onSuccess', async () => {
    mockFetch(registerUrl, {
      method: 'POST',
      status: 200,
      response: {
        meta: {
          access_token: {
            refresh:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTczNDE4OTc2NSwiaWF0IjoxNzM0MTAzMzY1LCJqdGkiOiJiMWQ3ZjVmZTNmY2I0MjMyYjQzMDY5MTQxNWVkNDg3ZSIsInVzZXJfaWQiOjE3LCJpZCI6MTcsInByb2ZpbGUiOnsiaWQiOiJVSEp2Wm1sc1pUb3hOdz09IiwibmFtZSI6IkRheSB3aG8iLCJpbWFnZSI6bnVsbCwidXJsX3BhdGgiOm51bGx9LCJlbWFpbCI6InBzKzk5QHRzbC5pbyIsIm5ld19lbWFpbCI6IiIsImlzX25ld19lbWFpbF9jb25maXJtZWQiOmZhbHNlLCJyZWZlcnJhbF9jb2RlIjoiIiwicGhvbmVfbnVtYmVyIjpudWxsLCJwcmVmZXJyZWRfbGFuZ3VhZ2UiOiJlbiJ9.cASRdO9ge6amlySR4j11FRPRELMztaf5CMLnKvEEQ0o',
            access:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM0MTAzNjY1LCJpYXQiOjE3MzQxMDMzNjUsImp0aSI6Ijg4NjM4YWQ2NTdkODRiMjZiYzA4NDFlNWYyYjgzY2YyIiwidXNlcl9pZCI6MTcsImlkIjoxNywicHJvZmlsZSI6eyJpZCI6IlVISnZabWxzWlRveE53PT0iLCJuYW1lIjoiRGF5IHdobyIsImltYWdlIjpudWxsLCJ1cmxfcGF0aCI6bnVsbH0sImVtYWlsIjoicHMrOTlAdHNsLmlvIiwibmV3X2VtYWlsIjoiIiwiaXNfbmV3X2VtYWlsX2NvbmZpcm1lZCI6ZmFsc2UsInJlZmVycmFsX2NvZGUiOiIiLCJwaG9uZV9udW1iZXIiOm51bGwsInByZWZlcnJlZF9sYW5ndWFnZSI6ImVuIn0.LKMkqKbn24Uqw67tys0ZltIEbMPE2z4hTo3D6ilOASM',
          },
        },
      },
    })

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useSignUp({
          formOptions: {
            defaultValues: request,
          },
          options: {
            onSuccess: () => {
              hasOnSuccessRan = true
            },
            path: registerUrl,
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
          options: {
            path: registerUrl,
          },
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
          options: {
            onError: () => {
              hasOnErrorRan = true
            },
            path: registerUrl,
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
          options: {
            onSuccess: () => {
              hasOnSuccessRan = true
            },
            path: registerUrl,
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
