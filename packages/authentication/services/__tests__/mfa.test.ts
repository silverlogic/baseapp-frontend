import { axios } from '@baseapp-frontend/utils'

import { type MockedFunction, vi } from 'vitest'

import MfaApi from '../mfa'

vi.mock('@baseapp-frontend/utils', async () => ({
  ...(await vi.importActual<typeof import('@baseapp-frontend/utils')>('@baseapp-frontend/utils')),
  axios: {
    get: vi.fn(),
    post: vi.fn(),
  },
}))

const mockAxiosGet = axios.get as MockedFunction<typeof axios.get>
const mockAxiosPost = axios.post as MockedFunction<typeof axios.post>

describe('MfaApi', () => {
  beforeEach(() => {
    mockAxiosGet.mockReset().mockResolvedValue({})
    mockAxiosPost.mockReset().mockResolvedValue({})
  })

  describe('sendCode', () => {
    it('posts to the code request endpoint for the primary method by default', async () => {
      await MfaApi.sendCode()

      expect(mockAxiosGet).not.toHaveBeenCalled()
      expect(mockAxiosPost).toHaveBeenCalledWith('/auth/mfa/code/request/', {})
    })

    it('sends the given method', async () => {
      await MfaApi.sendCode({ method: 'email' })

      expect(mockAxiosPost).toHaveBeenCalledWith('/auth/mfa/code/request/', { method: 'email' })
    })

    it('returns the dispatch details', async () => {
      mockAxiosPost.mockResolvedValue({ details: 'Email message with MFA code has been sent.' })

      await expect(MfaApi.sendCode()).resolves.toEqual({
        details: 'Email message with MFA code has been sent.',
      })
    })
  })

  it('returns the regenerated backup codes', async () => {
    // the shared axios instance camelizes `backup_codes`
    mockAxiosPost.mockResolvedValue({ backupCodes: ['abc123', 'def456'] })

    await expect(
      MfaApi.regenerateBackupCodes({ method: 'email', code: '123456' }),
    ).resolves.toEqual({ backupCodes: ['abc123', 'def456'] })
    expect(mockAxiosPost).toHaveBeenCalledWith('/auth/mfa/email/codes/regenerate/', {
      code: '123456',
    })
  })

  it('changes the primary method with a code from the new method', async () => {
    await MfaApi.changePrimaryMethod({ method: 'app', code: '123456' })

    expect(mockAxiosPost).toHaveBeenCalledWith('/auth/mfa/change-primary-method/', {
      method: 'app',
      code: '123456',
    })
  })

  it('calls every endpoint under /auth/mfa/', async () => {
    await MfaApi.activate({ method: 'app' })
    await MfaApi.confirmActivation({ method: 'app', code: '123456' })
    await MfaApi.deactivate({ method: 'app', code: '123456' })
    await MfaApi.regenerateBackupCodes({ method: 'app', code: '123456' })
    await MfaApi.getActiveMethods()
    await MfaApi.getConfiguration()

    expect(mockAxiosPost.mock.calls).toEqual([
      ['/auth/mfa/app/activate/'],
      ['/auth/mfa/app/activate/confirm/', { code: '123456' }],
      ['/auth/mfa/app/deactivate/', { code: '123456' }],
      ['/auth/mfa/app/codes/regenerate/', { code: '123456' }],
    ])
    expect(mockAxiosGet.mock.calls).toEqual([
      ['/auth/mfa/user-active-methods/'],
      ['/auth/mfa/config/'],
    ])
  })
})
