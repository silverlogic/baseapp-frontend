import { axios } from '@baseapp-frontend/utils'

import { renderHook } from '@testing-library/react'

import { FileUploadStatus } from '../../../constants'
import { useFileUploadStore } from '../../../context/FileUploadProvider'
import { uploadChunks } from '../../../utils'
import { useChunkedUpload } from '../index'

jest.mock('@baseapp-frontend/utils', () => ({
  axios: {
    post: jest.fn(),
    delete: jest.fn(),
  },
}))

jest.mock('../../../utils', () => ({
  ...jest.requireActual('../../../utils'),
  uploadChunks: jest.fn(),
}))

const mockAxiosPost = axios.post as jest.MockedFunction<typeof axios.post>
const mockAxiosDelete = axios.delete as jest.MockedFunction<typeof axios.delete>
const mockUploadChunks = uploadChunks as jest.MockedFunction<typeof uploadChunks>

const CHUNK_SIZE = 5 * 1024 * 1024
const makeFile = (chunks: number) =>
  new File([new Uint8Array(chunks * CHUNK_SIZE)], 'video.mp4', { type: 'video/mp4' })

const initiateResponse = (numParts: number, expiresIn = 3600) => ({
  id: 'file-public-id',
  relayId: 'RmlsZTox',
  uploadId: 'upload-1',
  uploadStatus: 'uploading',
  expiresIn,
  presignedUrls: Array.from({ length: numParts }, (_, i) => ({
    partNumber: i + 1,
    url: `https://s3/part-${i}`,
  })),
})

describe('useChunkedUpload', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useFileUploadStore.setState({ files: new Map() })
  })

  it('uploadFile initiates, uploads every chunk and completes', async () => {
    mockAxiosPost
      .mockResolvedValueOnce(initiateResponse(2) as never)
      .mockResolvedValueOnce({} as never)
    mockUploadChunks.mockResolvedValue(['etag-0', 'etag-1'])

    const { result } = renderHook(() => useChunkedUpload())
    const relayId = await result.current.uploadFile(makeFile(2))

    expect(relayId).toBe('RmlsZTox')
    expect(mockAxiosPost).toHaveBeenNthCalledWith(
      1,
      'files/uploads',
      expect.objectContaining({ numParts: 2, partSize: CHUNK_SIZE }),
    )
    expect(mockAxiosPost).toHaveBeenNthCalledWith(2, 'files/uploads/file-public-id/complete', {
      parts: [
        { partNumber: 1, etag: 'etag-0' },
        { partNumber: 2, etag: 'etag-1' },
      ],
    })

    const progress = Array.from(useFileUploadStore.getState().files.values())[0]!
    expect(progress.status).toBe(FileUploadStatus.COMPLETED)
  })

  it('uploadFile marks the file failed and rethrows on error', async () => {
    mockAxiosPost.mockRejectedValue(new Error('initiate failed'))

    const { result } = renderHook(() => useChunkedUpload())
    await expect(result.current.uploadFile(makeFile(1))).rejects.toThrow('initiate failed')

    const progress = Array.from(useFileUploadStore.getState().files.values())[0]!
    expect(progress.status).toBe(FileUploadStatus.FAILED)
    expect(progress.error).toBe('initiate failed')
  })

  it('resumeUpload uploads only the chunks without recorded ETags', async () => {
    const file = makeFile(3)
    const { addFile, updateFileProgress } = useFileUploadStore.getState()
    const fileId = addFile(file)

    // Paused upload: chunks 0 and 2 already uploaded (out-of-order), 1 missing.
    updateFileProgress(fileId, {
      status: FileUploadStatus.PAUSED,
      backendId: 'file-public-id',
      fileRelayId: 'RmlsZTox',
      totalChunks: 3,
      etags: ['etag-0', undefined, 'etag-2'],
      completedChunks: 2,
      presignedUrls: initiateResponse(3).presignedUrls,
      initiatedAt: Date.now(),
      expiresIn: 3600,
    })

    mockUploadChunks.mockResolvedValue(['etag-1'])
    mockAxiosPost.mockResolvedValue({} as never)

    const { result } = renderHook(() => useChunkedUpload())
    await result.current.resumeUpload(fileId)

    // Only the missing chunk was uploaded, against its original URL.
    const call = mockUploadChunks.mock.calls[0]![0]
    expect(call.chunks).toHaveLength(1)
    expect(call.presignedUrls).toEqual(['https://s3/part-1'])

    expect(mockAxiosPost).toHaveBeenCalledWith('files/uploads/file-public-id/complete', {
      parts: [
        { partNumber: 1, etag: 'etag-0' },
        { partNumber: 2, etag: 'etag-1' },
        { partNumber: 3, etag: 'etag-2' },
      ],
    })
    expect(useFileUploadStore.getState().files.get(fileId)!.status).toBe(FileUploadStatus.COMPLETED)
  })

  it('resumeUpload re-initiates from scratch when the presigned URLs expired', async () => {
    const file = makeFile(2)
    const { addFile, updateFileProgress } = useFileUploadStore.getState()
    const fileId = addFile(file)

    updateFileProgress(fileId, {
      status: FileUploadStatus.PAUSED,
      backendId: 'stale-id',
      totalChunks: 2,
      etags: ['etag-0'],
      completedChunks: 1,
      presignedUrls: initiateResponse(2).presignedUrls,
      initiatedAt: Date.now() - 2 * 3600 * 1000, // initiated two hours ago
      expiresIn: 3600,
    })

    mockAxiosDelete.mockResolvedValue({} as never)
    mockAxiosPost
      .mockResolvedValueOnce(initiateResponse(2) as never)
      .mockResolvedValueOnce({} as never)
    mockUploadChunks.mockResolvedValue(['fresh-0', 'fresh-1'])

    const { result } = renderHook(() => useChunkedUpload())
    await result.current.resumeUpload(fileId)

    // Stale upload aborted server-side, then a fresh initiate + full upload.
    expect(mockAxiosDelete).toHaveBeenCalledWith('files/uploads/stale-id')
    expect(mockAxiosPost).toHaveBeenNthCalledWith(1, 'files/uploads', expect.any(Object))
    expect(mockUploadChunks.mock.calls[0]![0].chunks).toHaveLength(2)
    expect(mockAxiosPost).toHaveBeenNthCalledWith(2, 'files/uploads/file-public-id/complete', {
      parts: [
        { partNumber: 1, etag: 'fresh-0' },
        { partNumber: 2, etag: 'fresh-1' },
      ],
    })
  })

  it('resumeUpload ignores files that are not paused', async () => {
    const { addFile } = useFileUploadStore.getState()
    const fileId = addFile(makeFile(1))

    const { result } = renderHook(() => useChunkedUpload())
    await result.current.resumeUpload(fileId)

    expect(mockAxiosPost).not.toHaveBeenCalled()
    expect(mockUploadChunks).not.toHaveBeenCalled()
  })

  it('pausing mid-upload leaves the file PAUSED, not FAILED, so resume is possible', async () => {
    // Simulate a pause during chunk upload: pauseFile flips UPLOADING→PAUSED and
    // aborts, so uploadChunks rejects. The catch must NOT clobber PAUSED.
    mockAxiosPost.mockResolvedValueOnce(initiateResponse(2) as never)
    mockUploadChunks.mockImplementation(async () => {
      const [id] = Array.from(useFileUploadStore.getState().files.keys())
      useFileUploadStore.getState().pauseFile(id!)
      throw new Error('Chunk upload aborted')
    })
    const onUploadError = jest.fn()

    const { result } = renderHook(() => useChunkedUpload({ onUploadError }))
    await expect(result.current.uploadFile(makeFile(2))).rejects.toThrow('Chunk upload aborted')

    const progress = Array.from(useFileUploadStore.getState().files.values())[0]!
    expect(progress.status).toBe(FileUploadStatus.PAUSED)
    expect(onUploadError).not.toHaveBeenCalled()
  })

  it('resumeUpload with every chunk already uploaded only completes, even if URLs expired', async () => {
    const file = makeFile(2)
    const { addFile, updateFileProgress } = useFileUploadStore.getState()
    const fileId = addFile(file)

    // All ETags present, but the presigned URLs are long expired.
    updateFileProgress(fileId, {
      status: FileUploadStatus.PAUSED,
      backendId: 'file-public-id',
      fileRelayId: 'RmlsZTox',
      totalChunks: 2,
      etags: ['etag-0', 'etag-1'],
      completedChunks: 2,
      presignedUrls: initiateResponse(2).presignedUrls,
      initiatedAt: Date.now() - 2 * 3600 * 1000,
      expiresIn: 3600,
    })

    mockAxiosPost.mockResolvedValue({} as never)

    const { result } = renderHook(() => useChunkedUpload())
    await result.current.resumeUpload(fileId)

    // No re-initiate, no re-upload, no DELETE — just the complete call.
    expect(mockUploadChunks).not.toHaveBeenCalled()
    expect(mockAxiosDelete).not.toHaveBeenCalled()
    expect(mockAxiosPost).toHaveBeenCalledTimes(1)
    expect(mockAxiosPost).toHaveBeenCalledWith('files/uploads/file-public-id/complete', {
      parts: [
        { partNumber: 1, etag: 'etag-0' },
        { partNumber: 2, etag: 'etag-1' },
      ],
    })
    expect(useFileUploadStore.getState().files.get(fileId)!.status).toBe(FileUploadStatus.COMPLETED)
  })

  it('retryUpload restarts a failed upload from scratch', async () => {
    const file = makeFile(1)
    const { addFile, updateFileProgress } = useFileUploadStore.getState()
    const fileId = addFile(file)
    updateFileProgress(fileId, { status: FileUploadStatus.FAILED, error: 'boom' })

    mockAxiosPost
      .mockResolvedValueOnce(initiateResponse(1) as never)
      .mockResolvedValueOnce({} as never)
    mockUploadChunks.mockResolvedValue(['etag-0'])

    const { result } = renderHook(() => useChunkedUpload())
    const relayId = await result.current.retryUpload(fileId)

    expect(relayId).toBe('RmlsZTox')
    expect(useFileUploadStore.getState().files.get(fileId)!.status).toBe(FileUploadStatus.COMPLETED)
  })
})
