import { act, renderHook } from '@testing-library/react'
import { vi } from 'vitest'

import useProtectedFileDownload from '../index'

const mockCommit = vi.fn()

vi.mock('../../../../common/graphql/mutations/ProtectedFileLink', () => ({
  useProtectedFileLinkMutation: () => [mockCommit, false],
}))

vi.mock('@baseapp-frontend/utils', () => ({
  useNotification: () => ({ sendApiErrorToast: vi.fn() }),
}))

const FILE = { key: 'events.certificate.html', objectId: '7' }
const URL = 'https://api.example.com/v1/files/protected/t/abc/'

const assign = vi.fn()
const open = vi.fn()

const mint = (response: unknown) =>
  act(async () => {
    mockCommit.mock.calls.at(-1)![0].onCompleted(response, undefined)
  })

describe('useProtectedFileDownload (web)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.stubGlobal('location', { ...window.location, assign })
    vi.stubGlobal('open', open)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('downloads an attachment by navigating to the link, without opening a tab', async () => {
    const { result } = renderHook(() => useProtectedFileDownload())

    act(() => {
      result.current.download(FILE)
    })
    await mint({ protectedFileLink: { url: URL, errors: null } })

    expect(open).not.toHaveBeenCalled()
    expect(assign).toHaveBeenCalledWith(URL)
  })

  it('opens an inline file in a tab reserved before the link is minted', async () => {
    const tab = { opener: window, location: { replace: vi.fn() }, close: vi.fn() }
    open.mockReturnValue(tab)
    const { result } = renderHook(() => useProtectedFileDownload())

    act(() => {
      result.current.download(FILE, { disposition: 'inline' })
    })

    expect(open).toHaveBeenCalledWith('', '_blank')
    expect(open.mock.invocationCallOrder[0]).toBeLessThan(mockCommit.mock.invocationCallOrder[0]!)
    expect(tab.opener).toBeNull()

    await mint({ protectedFileLink: { url: URL, errors: null } })

    expect(tab.location.replace).toHaveBeenCalledWith(URL)
    expect(tab.close).not.toHaveBeenCalled()
    expect(assign).not.toHaveBeenCalled()
  })

  it('closes the reserved tab when the link cannot be minted', async () => {
    const tab = { opener: window, location: { replace: vi.fn() }, close: vi.fn() }
    open.mockReturnValue(tab)
    const { result } = renderHook(() => useProtectedFileDownload())

    act(() => {
      result.current.download(FILE, { disposition: 'inline' })
    })
    await mint({ protectedFileLink: { url: null, errors: [{ field: null, messages: ['No.'] }] } })

    expect(tab.close).toHaveBeenCalled()
    expect(tab.location.replace).not.toHaveBeenCalled()
  })

  it('opens an inline file in this tab when the browser blocks the new one', async () => {
    open.mockReturnValue(null)
    const { result } = renderHook(() => useProtectedFileDownload())

    act(() => {
      result.current.download(FILE, { disposition: 'inline' })
    })
    await mint({ protectedFileLink: { url: URL, errors: null } })

    expect(assign).toHaveBeenCalledWith(URL)
  })
})
