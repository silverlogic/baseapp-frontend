import { vi } from 'vitest'

import { type ChunkUploadError, uploadChunk } from '../uploadChunk'

type Listener = () => void

class FakeXhr {
  static respond: (xhr: FakeXhr) => void

  status = 0

  statusText = ''

  responseText = ''

  headers: Record<string, string> = {}

  upload = { addEventListener: vi.fn() }

  private listeners: Record<string, Listener> = {}

  addEventListener(event: string, listener: Listener) {
    this.listeners[event] = listener
  }

  getResponseHeader(name: string) {
    return this.headers[name] ?? null
  }

  open = vi.fn()

  setRequestHeader = vi.fn()

  abort = vi.fn()

  send() {
    FakeXhr.respond(this)
    this.listeners.load?.()
  }
}

describe('uploadChunk', () => {
  beforeEach(() => {
    vi.stubGlobal('XMLHttpRequest', FakeXhr)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('resolves with the ETag of a stored part', async () => {
    FakeXhr.respond = (xhr) => {
      xhr.status = 200
      xhr.headers.ETag = '"etag-1"'
    }

    await expect(uploadChunk(new Blob(['x']), 'https://s3/part-0')).resolves.toBe('etag-1')
  })

  it('keeps the JSON body of a rejected part so its reason can be shown', async () => {
    FakeXhr.respond = (xhr) => {
      xhr.status = 400
      xhr.statusText = 'Bad Request'
      xhr.responseText = JSON.stringify({ detail: 'Upload has expired.' })
    }

    const error = (await uploadChunk(new Blob(['x']), 'https://s3/part-0').catch(
      (e) => e,
    )) as ChunkUploadError

    expect(error.message).toBe('Chunk upload failed: 400 Bad Request')
    expect(error.response).toEqual({ status: 400, data: { detail: 'Upload has expired.' } })
  })

  it('leaves data empty when the body is not JSON', async () => {
    FakeXhr.respond = (xhr) => {
      xhr.status = 403
      xhr.statusText = 'Forbidden'
      xhr.responseText = '<Error><Code>AccessDenied</Code></Error>'
    }

    const error = (await uploadChunk(new Blob(['x']), 'https://s3/part-0').catch(
      (e) => e,
    )) as ChunkUploadError

    expect(error.response).toEqual({ status: 403, data: undefined })
  })
})
