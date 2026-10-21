import { ComponentWithProviders, renderHook } from '@baseapp-frontend/test'

import { QueryClient } from '@tanstack/react-query'

import { MFA_API_KEY } from '../../../../services/mfa'
import useMfaChangePrimaryMethod from '../index'

describe('useMfaChangePrimaryMethod', () => {
  const invalidateQueriesSpy = vi.spyOn(QueryClient.prototype, 'invalidateQueries')

  afterEach(() => {
    invalidateQueriesSpy.mockClear()
  })

  test('should change the primary method and refresh the active methods', async () => {
    const ApiClass = { changePrimaryMethod: vi.fn().mockResolvedValue(undefined) }
    const onSuccess = vi.fn()

    const { result } = renderHook(
      () => useMfaChangePrimaryMethod({ ApiClass, options: { onSuccess } }),
      { wrapper: ComponentWithProviders },
    )

    await result.current.mutateAsync({ method: 'app', code: '123456' })

    expect(ApiClass.changePrimaryMethod).toHaveBeenCalledWith({ method: 'app', code: '123456' })
    expect(invalidateQueriesSpy).toHaveBeenCalledWith({
      queryKey: MFA_API_KEY.getActiveMethods(),
    })
    expect(onSuccess).toHaveBeenCalledTimes(1)
  })

  test('should run onError and keep the active methods cached', async () => {
    const ApiClass = { changePrimaryMethod: vi.fn().mockRejectedValue({ code: ['Invalid code'] }) }
    const onError = vi.fn()

    const { result } = renderHook(
      () => useMfaChangePrimaryMethod({ ApiClass, options: { onError } }),
      { wrapper: ComponentWithProviders },
    )

    await expect(result.current.mutateAsync({ method: 'app', code: '000000' })).rejects.toEqual({
      code: ['Invalid code'],
    })

    expect(onError).toHaveBeenCalledTimes(1)
    expect(invalidateQueriesSpy).not.toHaveBeenCalled()
  })
})
