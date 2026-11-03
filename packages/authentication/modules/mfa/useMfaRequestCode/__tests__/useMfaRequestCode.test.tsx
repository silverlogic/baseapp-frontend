import { ComponentWithProviders, renderHook } from '@baseapp-frontend/test'

import useMfaRequestCode from '../index'

describe('useMfaRequestCode', () => {
  const details = 'Email message with MFA code has been sent.'

  test('should request a code for the primary method when no method is given', async () => {
    const ApiClass = { sendCode: vi.fn().mockResolvedValue({ details }) }
    const onSuccess = vi.fn()

    const { result } = renderHook(() => useMfaRequestCode({ ApiClass, options: { onSuccess } }), {
      wrapper: ComponentWithProviders,
    })

    await expect(result.current.mutateAsync()).resolves.toEqual({ details })

    expect(ApiClass.sendCode).toHaveBeenCalledWith({})
    expect(onSuccess).toHaveBeenCalledTimes(1)
  })

  test('should request a code for the given method', async () => {
    const ApiClass = { sendCode: vi.fn().mockResolvedValue({ details }) }

    const { result } = renderHook(() => useMfaRequestCode({ ApiClass }), {
      wrapper: ComponentWithProviders,
    })

    await result.current.mutateAsync({ method: 'sms_twilio' })

    expect(ApiClass.sendCode).toHaveBeenCalledWith({ method: 'sms_twilio' })
  })

  test('should run onError', async () => {
    const ApiClass = { sendCode: vi.fn().mockRejectedValue({ detail: 'Request was throttled.' }) }
    const onError = vi.fn()

    const { result } = renderHook(() => useMfaRequestCode({ ApiClass, options: { onError } }), {
      wrapper: ComponentWithProviders,
    })

    await expect(result.current.mutateAsync({ method: 'email' })).rejects.toBeDefined()

    expect(onError).toHaveBeenCalledTimes(1)
  })
})
