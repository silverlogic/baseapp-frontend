import { uploadChunk } from '../uploadChunk'
import { uploadChunks } from '../uploadChunks'

jest.mock('../uploadChunk')

const mockUploadChunk = uploadChunk as jest.MockedFunction<typeof uploadChunk>

const makeChunks = (amount: number) => Array.from({ length: amount }, () => new Blob(['x']))
const makeUrls = (amount: number) =>
  Array.from({ length: amount }, (_, i) => `https://s3/part-${i}`)

describe('uploadChunks', () => {
  beforeEach(() => {
    mockUploadChunk.mockReset()
  })

  it('throws when chunks and URLs counts differ', async () => {
    await expect(
      uploadChunks({ chunks: makeChunks(2), presignedUrls: makeUrls(3) }),
    ).rejects.toThrow('Chunks and presigned URLs count mismatch')
  })

  it('returns ETags indexed by chunk even when chunks complete out of order', async () => {
    mockUploadChunk.mockImplementation((_chunk, url) => {
      const index = Number(url.split('-').pop())
      // Later chunks resolve sooner to force out-of-order completion.
      return new Promise((resolve) => {
        setTimeout(() => resolve(`etag-${index}`), (5 - index) * 5)
      })
    })

    const etags = await uploadChunks({
      chunks: makeChunks(5),
      presignedUrls: makeUrls(5),
    })

    expect(etags).toEqual(['etag-0', 'etag-1', 'etag-2', 'etag-3', 'etag-4'])
  })

  it('reports each completed chunk with its original index and ETag', async () => {
    mockUploadChunk.mockImplementation((_chunk, url) =>
      Promise.resolve(`etag-${url.split('-').pop()}`),
    )
    const onChunkComplete = jest.fn()

    await uploadChunks({
      chunks: makeChunks(3),
      presignedUrls: makeUrls(3),
      onChunkComplete,
    })

    expect(onChunkComplete).toHaveBeenCalledTimes(3)
    expect(onChunkComplete).toHaveBeenCalledWith(0, 'etag-0')
    expect(onChunkComplete).toHaveBeenCalledWith(1, 'etag-1')
    expect(onChunkComplete).toHaveBeenCalledWith(2, 'etag-2')
  })

  it('retries failed chunks with backoff before succeeding', async () => {
    mockUploadChunk
      .mockRejectedValueOnce(new Error('network'))
      .mockRejectedValueOnce(new Error('network'))
      .mockResolvedValue('etag-ok')

    const etags = await uploadChunks({
      chunks: makeChunks(1),
      presignedUrls: makeUrls(1),
      retryDelay: 1,
    })

    expect(etags).toEqual(['etag-ok'])
    expect(mockUploadChunk).toHaveBeenCalledTimes(3)
  })

  it('fails after exhausting retry attempts', async () => {
    mockUploadChunk.mockRejectedValue(new Error('network'))

    await expect(
      uploadChunks({
        chunks: makeChunks(1),
        presignedUrls: makeUrls(1),
        retryAttempts: 2,
        retryDelay: 1,
      }),
    ).rejects.toThrow('Failed to upload chunk 0 after 2 attempts')

    // 1 initial + 2 retries
    expect(mockUploadChunk).toHaveBeenCalledTimes(3)
  })

  it('does not retry when the upload was aborted', async () => {
    const abortController = new AbortController()
    mockUploadChunk.mockImplementation(() => {
      abortController.abort()
      return Promise.reject(new Error('aborted'))
    })

    await expect(
      uploadChunks({
        chunks: makeChunks(1),
        presignedUrls: makeUrls(1),
        abortSignal: abortController.signal,
        retryDelay: 1,
      }),
    ).rejects.toThrow('aborted')

    expect(mockUploadChunk).toHaveBeenCalledTimes(1)
  })
})
