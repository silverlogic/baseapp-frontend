import {
  ComponentWithProviders,
  mockFetch,
  mockFetchError,
  renderHook,
} from '@baseapp-frontend/test'

import { z } from 'zod'

import useChangeExpiredPassword from '../index'

describe('useChangeExpiredPassword', () => {
  const currentPassword = '1234'
  const password = '12345#Abcde'
  const token = 'fake-token'
  const changePasswordUrl = '/change-expired-password'

  afterEach(() => {
    ;(global.fetch as jest.Mock).mockClear() // Clear the mock between tests
  })

  test('should run onSuccess', async () => {
    // Mock the fetch call with a success response for POST method
    mockFetch(changePasswordUrl, {
      method: 'POST',
      status: 200,
      response: {
        currentPassword,
        newPassword: password,
        token,
      },
    })

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useChangeExpiredPassword({
          token,
          defaultValues: {
            currentPassword,
            newPassword: password,
            confirmNewPassword: password,
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

  test('should run onError', async () => {
    // Mock the fetch call with an error response
    mockFetchError(changePasswordUrl, { error: 'error', status: 500, method: 'POST' })

    let hasOnErrorRan = false

    const { result } = renderHook(
      () =>
        useChangeExpiredPassword({
          token,
          defaultValues: {
            currentPassword,
            newPassword: password,
            confirmNewPassword: password,
          },
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

  test('should run onError when newPassword and confirmNewPassword are different', async () => {
    // Mock the fetch call with a success response
    mockFetch(changePasswordUrl, {
      method: 'POST',
      status: 200,
      response: {},
    })

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useChangeExpiredPassword({
          token,
          defaultValues: {
            currentPassword,
            newPassword: password,
            confirmNewPassword: `${password}different`,
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

    expect(hasOnSuccessRan).toBe(false)
  })

  test('should allow custom defaultValues and validationSchema', async () => {
    // Mock the fetch call with a success response
    mockFetch(changePasswordUrl, {
      method: 'POST',
      status: 200,
      response: {},
    })

    const customDefaultValues = {
      currentPassword: '1234',
      newPassword: '12345',
      confirmNewPassword: '123456', // custom validation allows different passwords
    }

    const customValidationSchema = z.object({
      currentPassword: z.string().min(1),
      newPassword: z.string().min(1),
      confirmNewPassword: z.string().min(1),
    })

    let hasOnSuccessRan = false

    const { result } = renderHook(
      () =>
        useChangeExpiredPassword({
          token,
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
