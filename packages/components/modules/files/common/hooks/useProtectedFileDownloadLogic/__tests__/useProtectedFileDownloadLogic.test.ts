import { act, renderHook } from '@testing-library/react'
import { vi } from 'vitest'

import { ProtectedFileDownloadError } from '../../../utils/protectedFiles'
import { useProtectedFileDownloadLogic } from '../index'
import type { ProtectedFileDownloadTarget } from '../types'

const mockCommit = vi.fn()
const mockToast = vi.fn()

vi.mock('../../../graphql/mutations/ProtectedFileLink', () => ({
  useProtectedFileLinkMutation: () => [mockCommit, false],
}))

vi.mock('@baseapp-frontend/utils', () => ({
  useNotification: () => ({ sendApiErrorToast: mockToast }),
}))

const FILE = { key: 'billing.invoice.pdf', objectId: '42' }
const URL = 'https://api.example.com/v1/files/protected/t/abc/'

const lastConfig = () => mockCommit.mock.calls.at(-1)![0]
const complete = (response: unknown, errors?: unknown) =>
  act(async () => {
    lastConfig().onCompleted(response, errors)
  })

const setup = (onError?: (error: ProtectedFileDownloadError) => void) => {
  const target: ProtectedFileDownloadTarget = { open: vi.fn(), cancel: vi.fn() }
  const createTarget = vi.fn(() => target)
  const hook = renderHook(() => useProtectedFileDownloadLogic({ createTarget, onError }))
  return { hook, target, createTarget }
}

describe('useProtectedFileDownloadLogic', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates the target before minting, then opens the minted link', async () => {
    const { hook, target, createTarget } = setup()

    let result: Promise<boolean>
    act(() => {
      result = hook.result.current.download(FILE, { disposition: 'inline' })
    })

    expect(createTarget).toHaveBeenCalledWith('inline')
    expect(createTarget.mock.invocationCallOrder[0]).toBeLessThan(
      mockCommit.mock.invocationCallOrder[0]!,
    )
    expect(lastConfig().variables).toEqual({ input: FILE })
    expect(hook.result.current.pendingKey).toBe('billing.invoice.pdf:42')
    expect(hook.result.current.isPending).toBe(true)

    await complete({ protectedFileLink: { url: URL, errors: null } })

    expect(await result!).toBe(true)
    expect(target.open).toHaveBeenCalledWith(URL)
    expect(target.cancel).not.toHaveBeenCalled()
    expect(hook.result.current.pendingKey).toBeNull()
  })

  it('defaults to an attachment', () => {
    const { hook, createTarget } = setup()

    act(() => {
      hook.result.current.download(FILE)
    })

    expect(createTarget).toHaveBeenCalledWith('attachment')
  })

  it('cancels the target and toasts a payload error', async () => {
    const { hook, target } = setup()

    let result: Promise<boolean>
    act(() => {
      result = hook.result.current.download(FILE)
    })
    await complete({
      protectedFileLink: { url: null, errors: [{ field: 'key', messages: ['Nope.'] }] },
    })

    expect(await result!).toBe(false)
    expect(target.open).not.toHaveBeenCalled()
    expect(target.cancel).toHaveBeenCalled()
    expect(mockToast).toHaveBeenCalledWith(expect.objectContaining({ message: 'Nope.' }))
    expect(hook.result.current.pendingKey).toBeNull()
  })

  it('keeps the backend error code of a transport error and hands it to onError', async () => {
    const onError = vi.fn()
    const { hook, target } = setup(onError)

    let result: Promise<boolean>
    act(() => {
      result = hook.result.current.download(FILE)
    })
    const error = Object.assign(new Error('Error fetching GraphQL query ...'), {
      graphQLErrors: [
        { message: 'Your membership is inactive.', extensions: { code: 'membership_inactive' } },
      ],
    })
    await act(async () => {
      lastConfig().onError(error)
    })

    expect(await result!).toBe(false)
    expect(target.cancel).toHaveBeenCalled()
    expect(mockToast).not.toHaveBeenCalled()
    const [reported] = onError.mock.calls[0]!
    expect(reported).toBeInstanceOf(ProtectedFileDownloadError)
    expect(reported).toMatchObject({
      message: 'Your membership is inactive.',
      code: 'membership_inactive',
    })
  })

  it('treats errors passed to onCompleted, or a missing url, as failures', async () => {
    const onError = vi.fn()
    const { hook } = setup(onError)

    act(() => {
      hook.result.current.download(FILE)
    })
    await complete({ protectedFileLink: null }, [
      { message: 'File not found.', extensions: { code: 'not_found' } },
    ])
    act(() => {
      hook.result.current.download(FILE)
    })
    await complete({ protectedFileLink: { url: null, errors: null } })

    expect(onError.mock.calls.map(([error]) => [error.message, error.code])).toEqual([
      ['File not found.', 'not_found'],
      ['Could not open the file. Please try again.', undefined],
    ])
  })

  it('reports a target that fails to open', async () => {
    const onError = vi.fn()
    const { hook, target } = setup(onError)
    vi.mocked(target.open).mockRejectedValueOnce(new Error('No app can open this link.'))

    let result: Promise<boolean>
    act(() => {
      result = hook.result.current.download(FILE)
    })
    await complete({ protectedFileLink: { url: URL, errors: null } })

    expect(await result!).toBe(false)
    expect(onError).toHaveBeenCalledWith(
      expect.objectContaining({ message: 'No app can open this link.' }),
    )
  })

  it('ignores a second click on a file that is still being minted', async () => {
    const { hook, createTarget } = setup()

    let second: Promise<boolean>
    act(() => {
      hook.result.current.download(FILE)
      second = hook.result.current.download(FILE)
    })

    expect(await second!).toBe(false)
    expect(mockCommit).toHaveBeenCalledTimes(1)
    expect(createTarget).toHaveBeenCalledTimes(1)
  })
})

describe('useProtectedFileDownloadLogic pending state', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('stays pending until every file in flight has finished', async () => {
    const createTarget = vi.fn(() => ({ open: vi.fn() }))
    const { result } = renderHook(() => useProtectedFileDownloadLogic({ createTarget }))
    const other = { key: 'billing.payment.receipt_pdf', objectId: '9' }

    act(() => {
      result.current.download(FILE)
      result.current.download(other)
    })
    expect(result.current.pendingKey).toBe('billing.payment.receipt_pdf:9')

    await act(async () => {
      mockCommit.mock.calls[1]![0].onCompleted({ protectedFileLink: { url: URL, errors: null } })
    })
    expect(result.current.pendingKey).toBe('billing.invoice.pdf:42')
    expect(result.current.isPending).toBe(true)

    await act(async () => {
      mockCommit.mock.calls[0]![0].onCompleted({ protectedFileLink: { url: URL, errors: null } })
    })
    expect(result.current.isPending).toBe(false)
    expect(result.current.pendingKey).toBeNull()
  })

  it('reports a target that cannot be created and does not mint', async () => {
    const onError = vi.fn()
    const createTarget = vi.fn(() => {
      throw new Error('Blocked.')
    })
    const { result } = renderHook(() => useProtectedFileDownloadLogic({ createTarget, onError }))

    let outcome: Promise<boolean>
    act(() => {
      outcome = result.current.download(FILE)
    })

    expect(await outcome!).toBe(false)
    expect(mockCommit).not.toHaveBeenCalled()
    expect(onError).toHaveBeenCalledWith(expect.objectContaining({ message: 'Blocked.' }))
    expect(result.current.isPending).toBe(false)
  })
})
