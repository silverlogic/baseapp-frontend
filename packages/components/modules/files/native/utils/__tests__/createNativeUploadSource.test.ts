import { vi } from 'vitest'

import { createNativeUploadSource } from '../createNativeUploadSource'

const BYTES = Uint8Array.from({ length: 10 }, (_, i) => i)

const handles: { offset: number | null; closed: boolean }[] = []
const deleted: string[] = []

vi.mock('expo-file-system', () => {
  class File {
    uri: string

    constructor(...parts: (string | { uri: string })[]) {
      this.uri = parts.map((part) => (typeof part === 'string' ? part : part.uri)).join('/')
    }

    get name() {
      return this.uri.split('/').pop() ?? ''
    }

    get type() {
      return 'application/pdf'
    }

    get size() {
      return BYTES.length
    }

    get exists() {
      return true
    }

    delete() {
      deleted.push(this.uri)
    }

    open() {
      if (this.uri.startsWith('content://')) throw new Error('content URIs cannot be opened')
      const handle = {
        offset: null as number | null,
        closed: false,
        readBytes: (length: number) =>
          BYTES.slice(handle.offset ?? 0, (handle.offset ?? 0) + length),
        close: () => {
          handle.closed = true
        },
      }
      handles.push(handle)
      return handle
    }
  }
  return { File, Paths: { cache: { uri: 'file:///cache' } } }
})

const copyAsync = vi.fn(async (_options: { from: string; to: string }) => undefined)
vi.mock('expo-file-system/legacy', () => ({
  copyAsync: (options: { from: string; to: string }) => copyAsync(options),
}))

describe('createNativeUploadSource', () => {
  beforeEach(() => {
    handles.length = 0
    deleted.length = 0
    copyAsync.mockClear()
  })

  it('reads exactly the requested range and closes the handle', async () => {
    const source = await createNativeUploadSource({ uri: 'file:///tmp/doc.pdf' })

    expect(source).toMatchObject({ name: 'doc.pdf', size: 10, type: 'application/pdf' })
    expect(Array.from((await source.readChunk(3, 7)) as Uint8Array)).toEqual([3, 4, 5, 6])
    expect(handles).toHaveLength(1)
    expect(handles[0]!.closed).toBe(true)
    expect(copyAsync).not.toHaveBeenCalled()
  })

  it('prefers the picker metadata for name and type', async () => {
    const source = await createNativeUploadSource({
      uri: 'file:///tmp/IMG_0001',
      name: 'holiday.jpg',
      type: 'image/jpeg',
    })

    expect(source).toMatchObject({ name: 'holiday.jpg', type: 'image/jpeg' })
  })

  it('copies a content:// URI to the cache before reading from it', async () => {
    const source = await createNativeUploadSource({
      uri: 'content://com.android.providers/document/42',
      name: 'report.pdf',
    })

    expect(copyAsync).toHaveBeenCalledWith({
      from: 'content://com.android.providers/document/42',
      to: expect.stringMatching(/^file:\/\/\/cache\/upload-/),
    })
    expect(source.name).toBe('report.pdf')
    expect(Array.from((await source.readChunk(0, 2)) as Uint8Array)).toEqual([0, 1])
  })

  it('deletes only the cache copy it made when disposed', async () => {
    const picked = await createNativeUploadSource({ uri: 'file:///tmp/doc.pdf' })
    const copied = await createNativeUploadSource({ uri: 'content://provider/document/7' })

    expect(picked.dispose).toBeUndefined()
    copied.dispose?.()
    expect(deleted).toEqual([expect.stringMatching(/^file:\/\/\/cache\/upload-/)])
  })

  it('removes a partial copy when the content copy fails', async () => {
    copyAsync.mockRejectedValueOnce(new Error('permission revoked'))

    await expect(
      createNativeUploadSource({ uri: 'content://provider/document/8' }),
    ).rejects.toThrow('permission revoked')
    expect(deleted).toHaveLength(1)
  })
})
