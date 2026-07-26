import { chunkFile } from '../chunkFile'

const makeFile = (size: number) => new File([new Uint8Array(size)], 'test.bin')

describe('chunkFile', () => {
  it('returns a single chunk for files smaller than the chunk size', () => {
    const chunks = chunkFile(makeFile(10), 100)
    expect(chunks).toHaveLength(1)
    expect(chunks[0]!.size).toBe(10)
  })

  it('splits files into chunkSize pieces with a smaller trailing chunk', () => {
    const chunks = chunkFile(makeFile(250), 100)
    expect(chunks).toHaveLength(3)
    expect(chunks.map((c) => c.size)).toEqual([100, 100, 50])
  })

  it('splits exact multiples without an empty trailing chunk', () => {
    const chunks = chunkFile(makeFile(200), 100)
    expect(chunks).toHaveLength(2)
    expect(chunks.map((c) => c.size)).toEqual([100, 100])
  })

  it('returns no chunks for an empty file', () => {
    expect(chunkFile(makeFile(0), 100)).toHaveLength(0)
  })
})
