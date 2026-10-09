import { isUploadSource, toUploadSource } from '../uploadSource'

describe('toUploadSource', () => {
  it('wraps a web File, reading the requested byte range', async () => {
    const file = new File([new Uint8Array([10, 11, 12, 13, 14])], 'a.png', { type: 'image/png' })

    const source = toUploadSource(file)

    expect(source).toMatchObject({ name: 'a.png', size: 5, type: 'image/png' })
    const chunk = (await source.readChunk(1, 4)) as Blob
    expect(Array.from(new Uint8Array(await chunk.arrayBuffer()))).toEqual([11, 12, 13])
  })

  it('passes a platform-built source through untouched', () => {
    const source = {
      name: 'b.pdf',
      size: 3,
      type: 'application/pdf',
      readChunk: async () => new Uint8Array([1, 2, 3]),
    }

    expect(toUploadSource(source)).toBe(source)
  })
})

describe('isUploadSource', () => {
  it('distinguishes a source from a web File', () => {
    expect(isUploadSource(new File(['x'], 'a.txt'))).toBe(false)
    expect(
      isUploadSource({ name: 'a', size: 1, type: '', readChunk: async () => new Uint8Array() }),
    ).toBe(true)
  })
})
