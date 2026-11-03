import { act, renderHook } from '@testing-library/react'
import { vi } from 'vitest'

import useProtectedFileDownload from '../index'

const mockCommit = vi.fn()
const mockOpenURL = vi.fn()

vi.mock('react-native', () => ({ Linking: { openURL: (url: string) => mockOpenURL(url) } }))

vi.mock('../../../../common/graphql/mutations/ProtectedFileLink', () => ({
  useProtectedFileLinkMutation: () => [mockCommit, false],
}))

vi.mock('@baseapp-frontend/utils', () => ({
  useNotification: () => ({ sendApiErrorToast: vi.fn() }),
}))

const URL = 'https://api.example.com/v1/files/protected/t/abc/'

describe('useProtectedFileDownload (native)', () => {
  it.each(['attachment', 'inline'] as const)(
    'opens an %s in the system browser',
    async (disposition) => {
      mockOpenURL.mockClear()
      const { result } = renderHook(() => useProtectedFileDownload())

      act(() => {
        result.current.download({ key: 'billing.invoice.pdf', objectId: '1' }, { disposition })
      })
      await act(async () => {
        mockCommit.mock.calls
          .at(-1)![0]
          .onCompleted({ protectedFileLink: { url: URL, errors: null } }, undefined)
      })

      expect(mockOpenURL).toHaveBeenCalledWith(URL)
    },
  )
})
