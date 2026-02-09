import {
  ComponentWithProviders,
  mockFetch,
  mockFetchError,
  renderHook,
} from '@baseapp-frontend/test'
import { setFormApiErrors } from '@baseapp-frontend/utils'

import { withAuthenticationTestProviders } from '../../../../tests/utils'
import useAllAuthSignUp from '../index'

jest.mock('@baseapp-frontend/utils', () => ({
  ...jest.requireActual('@baseapp-frontend/utils'),
  setFormApiErrors: jest.fn(),
}))

describe('useAllAuthSignUp', () => {
  const signupUrl = '/_allauth/app/v1/auth/signup'

  afterEach(() => {
    ;(global.fetch as jest.Mock).mockClear()
    ;(setFormApiErrors as jest.Mock).mockClear()
  })

  test('should call AllAuth signup endpoint', async () => {
    const request = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '#F12W7q0jwv525',
    }

    mockFetch(signupUrl, {
      method: 'POST',
      status: 200,
      response: {
        email: request.email,
      },
    })

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useAllAuthSignUp({
          formOptions: {
            defaultValues: request,
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
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining(signupUrl),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          first_name: request.firstName,
          last_name: request.lastName,
          password: request.password,
          email: request.email,
        }),
      }),
    )
  })

  test('should run onError', async () => {
    mockFetchError(signupUrl, {
      method: 'POST',
      status: 500,
      error: 'any',
    })

    const request = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '#F12W7q0jwv525',
    }

    let hasOnErrorRan = false

    const { result } = renderHook(
      () =>
        useAllAuthSignUp({
          formOptions: {
            defaultValues: request,
          },
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

  test('should set form API errors when enableFormApiErrors is true', async () => {
    mockFetchError(signupUrl, {
      method: 'POST',
      status: 500,
      error: 'any',
    })

    const { result } = renderHook(
      () =>
        useAllAuthSignUp({
          formOptions: {
            defaultValues: {
              firstName: 'John',
              lastName: 'Doe',
              email: 'test@example.com',
              password: '#F12W7q0jwv525',
            },
          },
          enableFormApiErrors: true,
        }),
      {
        wrapper: withAuthenticationTestProviders(ComponentWithProviders),
      },
    )

    await result.current.form.handleSubmit()

    expect(setFormApiErrors).toHaveBeenCalled()
  })

  test('should not set form API errors when enableFormApiErrors is false', async () => {
    mockFetchError(signupUrl, {
      method: 'POST',
      status: 500,
      error: 'any',
    })

    const { result } = renderHook(
      () =>
        useAllAuthSignUp({
          formOptions: {
            defaultValues: {
              firstName: 'John',
              lastName: 'Doe',
              email: 'test@example.com',
              password: '#F12W7q0jwv525',
            },
          },
          enableFormApiErrors: false,
        }),
      {
        wrapper: withAuthenticationTestProviders(ComponentWithProviders),
      },
    )

    await result.current.form.handleSubmit()

    expect(setFormApiErrors).not.toHaveBeenCalled()
  })

  test('should use name field when useNameField is true', async () => {
    mockFetch(signupUrl, {
      method: 'POST',
      status: 200,
      response: {
        email: 'test@example.com',
      },
    })

    const request = {
      name: 'John Doe',
      email: 'test@example.com',
      password: '#F12W7q0jwv525',
    }

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useAllAuthSignUp({
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

    expect(hasOnSuccessRan).toBe(true)
  })
})
