import { ComponentWithProviders, renderHook, waitFor } from '@baseapp-frontend/test'

import useMfaRegenerateBackupCodes from '../index'

describe('useMfaRegenerateBackupCodes', () => {
  test('should return the new backup codes', async () => {
    const backupCodes = ['abc123', 'def456']
    const ApiClass = { regenerateBackupCodes: vi.fn().mockResolvedValue({ backupCodes }) }
    const onSuccess = vi.fn()

    const { result } = renderHook(
      () => useMfaRegenerateBackupCodes({ ApiClass, options: { onSuccess } }),
      { wrapper: ComponentWithProviders },
    )

    await expect(result.current.mutateAsync({ method: 'email', code: '123456' })).resolves.toEqual({
      backupCodes,
    })

    expect(ApiClass.regenerateBackupCodes).toHaveBeenCalledWith({
      method: 'email',
      code: '123456',
    })
    expect(onSuccess.mock.calls[0]?.[0]).toEqual({ backupCodes })
    await waitFor(() => expect(result.current.data).toEqual({ backupCodes }))
  })

  test('should allow regenerating without a code', async () => {
    const ApiClass = { regenerateBackupCodes: vi.fn().mockResolvedValue({ backupCodes: [] }) }

    const { result } = renderHook(() => useMfaRegenerateBackupCodes({ ApiClass }), {
      wrapper: ComponentWithProviders,
    })

    await result.current.mutateAsync({ method: 'app' })

    expect(ApiClass.regenerateBackupCodes).toHaveBeenCalledWith({ method: 'app', code: undefined })
  })

  test('should run onError', async () => {
    const ApiClass = {
      regenerateBackupCodes: vi.fn().mockRejectedValue({ error: 'Not allowed.' }),
    }
    const onError = vi.fn()

    const { result } = renderHook(
      () => useMfaRegenerateBackupCodes({ ApiClass, options: { onError } }),
      { wrapper: ComponentWithProviders },
    )

    await expect(result.current.mutateAsync({ method: 'app', code: '1' })).rejects.toBeDefined()

    expect(onError).toHaveBeenCalledTimes(1)
  })
})
