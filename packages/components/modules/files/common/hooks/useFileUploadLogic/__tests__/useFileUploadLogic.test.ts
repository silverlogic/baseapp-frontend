import { act, renderHook } from '@testing-library/react'
import { vi } from 'vitest'

import { FileUploadStatus } from '../../../constants'
import { useFileUploadStore } from '../../../context/FileUploadProvider'
import { useFileUploadLogic } from '../index'

const mockAttachFiles = vi.fn()
const mockUploadFile = vi.fn()

vi.mock('react-relay', () => ({
  ConnectionHandler: { getConnectionID: (id: string) => `connection:${id}` },
}))

vi.mock('../../../graphql/mutations/FileAttachToTarget', () => ({
  useFileAttachToTargetMutation: () => [mockAttachFiles, false],
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

const attachedIds = () =>
  mockAttachFiles.mock.calls.map(([config]) => config.variables.input.fileRelayIds)

describe('useFileUploadLogic', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useFileUploadStore.setState({ files: new Map() })
  })

  it('attaches an upload that completes outside a batch (retry/resume)', () => {
    renderHook(() => useFileUploadLogic({ targetObjectId: TARGET }))

    completeUpload('File:1')

    expect(attachedIds()).toEqual([['File:1']])
  })

  it('removes the late upload from the store once attached', () => {
    renderHook(() => useFileUploadLogic({ targetObjectId: TARGET }))

    const id = completeUpload('File:1')
    act(() => {
      mockAttachFiles.mock.calls[0]![0].onCompleted()
    })

    expect(useFileUploadStore.getState().files.has(id)).toBe(false)
  })

  it('ignores other scopes and does nothing without autoAttach', () => {
    renderHook(() => useFileUploadLogic({ targetObjectId: TARGET, autoAttach: false }))
    renderHook(() => useFileUploadLogic({ targetObjectId: 'Comment:2' }))

    completeUpload('File:1')

    expect(mockAttachFiles).not.toHaveBeenCalled()
  })

  it('waits for a running batch, then attaches what completed meanwhile', async () => {
    let finishBatch: (relayId: string) => void = () => {}
    mockUploadFile.mockReturnValue(
      new Promise<string>((resolve) => {
        finishBatch = resolve
      }),
    )
    const { result } = renderHook(() => useFileUploadLogic({ targetObjectId: TARGET }))

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
})
