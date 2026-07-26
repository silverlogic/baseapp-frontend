import { FileUploadStatus } from '../../constants'
import { useFileUploadStore } from '../FileUploadProvider'

const makeFile = () => new File(['content'], 'test.txt')

const resetStore = () => {
  useFileUploadStore.setState({ files: new Map() })
}

describe('useFileUploadStore', () => {
  beforeEach(resetStore)

  it('addFile registers a pending file and returns its id', () => {
    const id = useFileUploadStore.getState().addFile(makeFile())
    const progress = useFileUploadStore.getState().files.get(id)

    expect(progress).toMatchObject({
      status: FileUploadStatus.PENDING,
      completedChunks: 0,
      etags: [],
    })
  })

  it('recordChunkEtag stores ETags sparsely and derives completedChunks', () => {
    const { addFile, recordChunkEtag } = useFileUploadStore.getState()
    const id = addFile(makeFile())

    // Chunks complete out of order.
    recordChunkEtag(id, 2, 'etag-2')
    recordChunkEtag(id, 0, 'etag-0')

    const progress = useFileUploadStore.getState().files.get(id)!
    expect(progress.etags).toEqual(['etag-0', undefined, 'etag-2'])
    expect(progress.completedChunks).toBe(2)

    recordChunkEtag(id, 1, 'etag-1')
    expect(useFileUploadStore.getState().files.get(id)!.completedChunks).toBe(3)
  })

  it('pauseFile aborts the in-flight controller and only pauses uploading files', () => {
    const { addFile, updateFileProgress, pauseFile } = useFileUploadStore.getState()
    const id = addFile(makeFile())
    const abortController = new AbortController()

    pauseFile(id) // PENDING — no-op
    expect(useFileUploadStore.getState().files.get(id)!.status).toBe(FileUploadStatus.PENDING)

    updateFileProgress(id, { status: FileUploadStatus.UPLOADING, abortController })
    pauseFile(id)

    const progress = useFileUploadStore.getState().files.get(id)!
    expect(progress.status).toBe(FileUploadStatus.PAUSED)
    expect(progress.abortController).toBeUndefined()
    expect(abortController.signal.aborted).toBe(true)
  })

  it('resumeFile moves paused files back to pending', () => {
    const { addFile, updateFileProgress, resumeFile } = useFileUploadStore.getState()
    const id = addFile(makeFile())

    updateFileProgress(id, { status: FileUploadStatus.PAUSED })
    resumeFile(id)

    expect(useFileUploadStore.getState().files.get(id)!.status).toBe(FileUploadStatus.PENDING)
  })

  it('retryFile resets progress for failed files only', () => {
    const { addFile, updateFileProgress, retryFile } = useFileUploadStore.getState()
    const id = addFile(makeFile())

    updateFileProgress(id, {
      status: FileUploadStatus.FAILED,
      completedChunks: 2,
      etags: ['a', 'b'],
      error: 'boom',
    })
    retryFile(id)

    const progress = useFileUploadStore.getState().files.get(id)!
    expect(progress).toMatchObject({
      status: FileUploadStatus.PENDING,
      completedChunks: 0,
      etags: [],
      error: undefined,
    })
  })

  it('clearCompleted removes only completed files', () => {
    const { addFile, updateFileProgress, clearCompleted } = useFileUploadStore.getState()
    const done = addFile(makeFile())
    const uploading = addFile(makeFile())

    updateFileProgress(done, { status: FileUploadStatus.COMPLETED })
    updateFileProgress(uploading, { status: FileUploadStatus.UPLOADING })
    clearCompleted()

    const { files } = useFileUploadStore.getState()
    expect(files.has(done)).toBe(false)
    expect(files.has(uploading)).toBe(true)
  })

  it('getCompletedFileIds returns relay ids of completed uploads', () => {
    const { addFile, updateFileProgress, getCompletedFileIds } = useFileUploadStore.getState()
    const id = addFile(makeFile())

    updateFileProgress(id, { status: FileUploadStatus.COMPLETED, fileRelayId: 'relay-1' })

    expect(getCompletedFileIds()).toEqual(['relay-1'])
  })
})
