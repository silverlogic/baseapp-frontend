import { type ReactNode, createElement } from 'react'

import { act, renderHook } from '@testing-library/react'
import { IntlProvider } from 'react-intl'
import { vi } from 'vitest'

import { FileUploadStatus } from '../../../constants'
import { useFileUploadStore } from '../../../context/FileUploadProvider'
import { useFileUploadLogic } from '../index'

const IntlWrapper = ({ children }: { children: ReactNode }) =>
  createElement(IntlProvider, { locale: 'en' }, children)
const renderWithIntl = <Result>(callback: () => Result) =>
  renderHook(callback, { wrapper: IntlWrapper })

const mockAttachFiles = vi.fn()
const mockUploadFile = vi.fn()

vi.mock('react-relay', () => ({
  ConnectionHandler: { getConnectionID: (id: string) => `connection:${id}` },
}))

// A new commit function per render, like the real hook, so effects that depend on it re-run.
vi.mock('../../../graphql/mutations/FileAttachToTarget', () => ({
  useFileAttachToTargetMutation: () => [
    (config: Parameters<typeof mockAttachFiles>[0]) => mockAttachFiles(config),
    false,
  ],
}))

vi.mock('../../useChunkedUpload', () => ({
  useChunkedUpload: () => ({ uploadFile: mockUploadFile }),
}))

const TARGET = 'Comment:1'

/** Put a finished upload in the store, as a retry/resume started elsewhere would. */
const completeUpload = (relayId: string, scope = TARGET) => {
  const { addFile, updateFileProgress } = useFileUploadStore.getState()
  const id = addFile(new File(['x'], `${relayId}.pdf`), scope)
  act(() => {
    updateFileProgress(id, { status: FileUploadStatus.COMPLETED, fileRelayId: relayId })
  })
  return id
}

/** An upload that paused (resume) or failed (retry) and then finished from the list item. */
const finishLater = (relayId: string, from: FileUploadStatus, uploadToken?: string) => {
  const { addFile, updateFileProgress } = useFileUploadStore.getState()
  const id = addFile(new File(['x'], `${relayId}.pdf`), TARGET)
  act(() => {
    updateFileProgress(id, { status: from, fileRelayId: relayId, uploadToken })
  })
  act(() => {
    updateFileProgress(id, { status: FileUploadStatus.COMPLETED })
  })
  return id
}

const attachedIds = () =>
  mockAttachFiles.mock.calls.map(([config]) => config.variables.input.fileRelayIds)

describe('useFileUploadLogic', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useFileUploadStore.setState({ files: new Map() })
  })

  it('attaches an upload that completes outside a batch (retry/resume)', () => {
    renderWithIntl(() => useFileUploadLogic({ targetObjectId: TARGET }))

    completeUpload('File:1')

    expect(attachedIds()).toEqual([['File:1']])
  })

  it('removes the late upload from the store once attached', () => {
    renderWithIntl(() => useFileUploadLogic({ targetObjectId: TARGET }))

    const id = completeUpload('File:1')
    act(() => {
      mockAttachFiles.mock.calls[0]![0].onCompleted({ fileAttachToTarget: { errors: null } })
    })

    expect(useFileUploadStore.getState().files.has(id)).toBe(false)
  })

  it('ignores other scopes and does nothing without autoAttach', () => {
    renderWithIntl(() => useFileUploadLogic({ targetObjectId: TARGET, autoAttach: false }))
    renderWithIntl(() => useFileUploadLogic({ targetObjectId: 'Comment:2' }))

    completeUpload('File:1')

    expect(mockAttachFiles).not.toHaveBeenCalled()
  })

  it('does not resend a failed attach on later renders', () => {
    const { rerender } = renderWithIntl(() => useFileUploadLogic({ targetObjectId: TARGET }))

    completeUpload('File:1')
    act(() => {
      mockAttachFiles.mock.calls[0]![0].onError(new Error('attach failed'))
    })
    rerender()
    rerender()

    expect(attachedIds()).toEqual([['File:1']])
  })

  it('keeps a file the server rejected listed, and does not resend it', () => {
    const onError = vi.fn()
    const { rerender } = renderWithIntl(() =>
      useFileUploadLogic({ targetObjectId: TARGET, onError }),
    )

    const id = completeUpload('File:1')
    act(() => {
      mockAttachFiles.mock.calls[0]![0].onCompleted({
        fileAttachToTarget: { errors: [{ field: 'files', messages: ['Not allowed'] }] },
      })
    })
    rerender()

    expect(useFileUploadStore.getState().files.has(id)).toBe(true)
    expect(attachedIds()).toEqual([['File:1']])
    expect(onError).toHaveBeenCalledWith(new Error('Not allowed'))
  })

  it('treats an attach without a payload as failed', () => {
    const onError = vi.fn()
    renderWithIntl(() => useFileUploadLogic({ targetObjectId: TARGET, onError }))

    const id = completeUpload('File:1')
    act(() => {
      mockAttachFiles.mock.calls[0]![0].onCompleted({ fileAttachToTarget: null })
    })

    expect(useFileUploadStore.getState().files.has(id)).toBe(true)
    expect(onError).toHaveBeenCalledWith(new Error('Attach failed'))
  })

  it('retries a failed attach with the next upload the user starts', async () => {
    mockUploadFile.mockResolvedValue('File:batch')
    const { result } = renderWithIntl(() => useFileUploadLogic({ targetObjectId: TARGET }))

    completeUpload('File:1')
    act(() => {
      mockAttachFiles.mock.calls[0]![0].onError(new Error('attach failed'))
    })
    await act(async () => {
      await result.current.handleFilesSelected([new File(['y'], 'batch.pdf')])
    })

    expect(attachedIds()).toEqual([['File:1'], ['File:batch'], ['File:1']])
  })

  it('waits for a running batch, then attaches what completed meanwhile', async () => {
    let finishBatch: (relayId: string) => void = () => {}
    mockUploadFile.mockReturnValue(
      new Promise<string>((resolve) => {
        finishBatch = resolve
      }),
    )
    const { result } = renderWithIntl(() => useFileUploadLogic({ targetObjectId: TARGET }))

    let batch: Promise<void> = Promise.resolve()
    act(() => {
      batch = result.current.handleFilesSelected([new File(['y'], 'batch.pdf')])
    })
    completeUpload('File:retried')
    expect(mockAttachFiles).not.toHaveBeenCalled()

    await act(async () => {
      finishBatch('File:batch')
      await batch
    })

    expect(attachedIds()).toEqual([['File:batch'], ['File:retried']])
  })

  describe.each([
    ['resumed', FileUploadStatus.PAUSED],
    ['retried', FileUploadStatus.FAILED],
  ])('an upload %s from the list item', (_label, from) => {
    it('is attached when autoAttach is on', () => {
      renderWithIntl(() => useFileUploadLogic({ targetObjectId: TARGET }))

      finishLater('File:1', from)

      expect(attachedIds()).toEqual([['File:1']])
    })

    it('is reported with its upload token when the caller attaches files itself', () => {
      const onUploadComplete = vi.fn()
      const { rerender } = renderWithIntl(() =>
        useFileUploadLogic({ targetObjectId: TARGET, autoAttach: false, onUploadComplete }),
      )

      const id = finishLater('File:1', from, 'token-1')
      rerender()

      expect(onUploadComplete).toHaveBeenCalledTimes(1)
      expect(onUploadComplete).toHaveBeenCalledWith(['File:1'], ['token-1'])
      expect(mockAttachFiles).not.toHaveBeenCalled()
      expect(useFileUploadStore.getState().files.has(id)).toBe(false)
    })
  })

  it('reports an upload that finished during a batch once the batch ends (autoAttach off)', async () => {
    let finishBatch: (relayId: string) => void = () => {}
    mockUploadFile.mockReturnValue(
      new Promise<string>((resolve) => {
        finishBatch = resolve
      }),
    )
    const onUploadComplete = vi.fn()
    const { result } = renderWithIntl(() =>
      useFileUploadLogic({ targetObjectId: TARGET, autoAttach: false, onUploadComplete }),
    )

    let batch: Promise<void> = Promise.resolve()
    act(() => {
      batch = result.current.handleFilesSelected([new File(['y'], 'batch.pdf')])
    })
    finishLater('File:retried', FileUploadStatus.FAILED)
    expect(onUploadComplete).not.toHaveBeenCalled()

    await act(async () => {
      finishBatch('File:batch')
      await batch
    })

    expect(onUploadComplete.mock.calls.map(([ids]) => ids)).toEqual([
      ['File:batch'],
      ['File:retried'],
    ])
  })
})
