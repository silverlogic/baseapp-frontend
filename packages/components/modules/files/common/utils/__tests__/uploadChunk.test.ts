import { vi } from 'vitest'

import { uploadChunk } from '../uploadChunk'

describe('uploadChunk', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('rejects without opening a request when the signal is already aborted', async () => {
    const XHR = vi.fn()
    vi.stubGlobal('XMLHttpRequest', XHR)
    const controller = new AbortController()
    controller.abort()

    await expect(
      uploadChunk(new Uint8Array([1]), 'https://s3/part-0', controller.signal),
    ).rejects.toThrow('Chunk upload aborted')
    expect(XHR).not.toHaveBeenCalled()
  })
})
