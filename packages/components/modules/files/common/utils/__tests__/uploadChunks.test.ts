import { type MockedFunction, vi } from 'vitest'

import { uploadChunk } from '../uploadChunk'
import { uploadChunks } from '../uploadChunks'

vi.mock('../uploadChunk')

const mockUploadChunk = uploadChunk as MockedFunction<typeof uploadChunk>

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
    const onChunkComplete = vi.fn()

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

  describe('lazy mode (readChunk)', () => {
    it('reads each chunk exactly once and uploads it against its own URL', async () => {
      const readChunk = vi.fn(async (index: number) => new Uint8Array([index]))
      mockUploadChunk.mockImplementation(async (_chunk, url) => `etag-${url.split('-').pop()}`)

      const etags = await uploadChunks({ readChunk, presignedUrls: makeUrls(3) })

      expect(etags).toEqual(['etag-0', 'etag-1', 'etag-2'])
      expect(readChunk.mock.calls.map(([index]) => index).sort()).toEqual([0, 1, 2])
      expect(mockUploadChunk).toHaveBeenCalledWith(
        new Uint8Array([2]),
        'https://s3/part-2',
        undefined,
        expect.any(Function),
      )
    })

    it('never holds more chunks in memory than the concurrency limit', async () => {
      let inFlight = 0
      let peak = 0
      const readChunk = vi.fn(async (index: number) => {
        inFlight += 1
        peak = Math.max(peak, inFlight)
        return new Uint8Array([index])
      })
      mockUploadChunk.mockImplementation(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              inFlight -= 1
              resolve('etag')
            }, 5)
          }),
      )

      await uploadChunks({ readChunk, presignedUrls: makeUrls(8), maxConcurrent: 2 })

      // A chunk is read only once it has a slot, so reads in flight track the limit.
      expect(readChunk).toHaveBeenCalledTimes(8)
      expect(peak).toBeLessThanOrEqual(2)
    })

    it('retries with the bytes it already read instead of reading again', async () => {
      const readChunk = vi.fn(async () => new Uint8Array([7]))
      mockUploadChunk.mockRejectedValueOnce(new Error('network')).mockResolvedValueOnce('etag-0')

      await uploadChunks({ readChunk, presignedUrls: makeUrls(1), retryDelay: 1 })

      expect(mockUploadChunk).toHaveBeenCalledTimes(2)
      expect(readChunk).toHaveBeenCalledTimes(1)
    })

    it('propagates a read failure', async () => {
      const readChunk = vi.fn(async () => {
        throw new Error('cannot read file')
      })

      await expect(uploadChunks({ readChunk, presignedUrls: makeUrls(1) })).rejects.toThrow(
        'cannot read file',
      )
      expect(mockUploadChunk).not.toHaveBeenCalled()
    })
  })

  it('does not start a lazily-read chunk once the upload was aborted', async () => {
    const controller = new AbortController()
    const readChunk = vi.fn(async () => {
      controller.abort()
      return new Uint8Array([1])
    })
    // The real uploadChunk rejects up front for an aborted signal; mirror that contract.
    mockUploadChunk.mockImplementation(async (_chunk, _url, signal) => {
      if (signal?.aborted) throw new Error('Chunk upload aborted')
      return 'etag'
    })

    await expect(
      uploadChunks({ readChunk, presignedUrls: makeUrls(1), abortSignal: controller.signal }),
    ).rejects.toThrow('aborted')
    expect(mockUploadChunk).toHaveBeenCalledTimes(1)
  })
})
