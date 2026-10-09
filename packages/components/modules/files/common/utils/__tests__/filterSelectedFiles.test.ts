import {
  describeRejectedFiles,
  filterSelectedFiles,
  isAcceptedFileType,
} from '../filterSelectedFiles'

const file = (name: string, type = '', size = 10) => ({ name, type, size })

const ACCEPT = { 'image/*': ['.png', '.jpg'], 'application/pdf': ['.pdf'] }

describe('isAcceptedFileType', () => {
  it('accepts everything when no types are configured', () => {
    expect(isAcceptedFileType(file('a.bin'))).toBe(true)
    expect(isAcceptedFileType(file('a.bin'), {})).toBe(true)
  })

  it('matches wildcard and exact MIME patterns', () => {
    expect(isAcceptedFileType(file('photo', 'image/heic'), ACCEPT)).toBe(true)
    expect(isAcceptedFileType(file('doc', 'application/pdf'), ACCEPT)).toBe(true)
    expect(isAcceptedFileType(file('clip', 'video/mp4'), ACCEPT)).toBe(false)
  })

  it('falls back to a case-insensitive extension when the MIME type is missing', () => {
    expect(isAcceptedFileType(file('scan.PDF'), ACCEPT)).toBe(true)
    expect(isAcceptedFileType(file('notes.txt'), ACCEPT)).toBe(false)
    expect(isAcceptedFileType(file('.pdf'), ACCEPT)).toBe(false)
  })
})

describe('filterSelectedFiles', () => {
  it('splits a selection into accepted and rejected with a reason', () => {
    const ok = file('a.png', 'image/png', 100)
    const big = file('b.png', 'image/png', 5000)
    const wrongType = file('c.exe', 'application/x-msdownload', 100)

    const result = filterSelectedFiles([ok, big, wrongType], {
      maxFileSize: 1000,
      acceptedFileTypes: ACCEPT,
    })

    expect(result.accepted).toEqual([ok])
    expect(result.rejected).toEqual([
      { file: big, reason: 'too-large' },
      { file: wrongType, reason: 'invalid-type' },
    ])
  })

  it('caps the count after dropping invalid files, so they do not use up slots', () => {
    const invalid = file('x.exe', 'application/x-msdownload')
    const valid = [file('1.pdf'), file('2.pdf'), file('3.pdf')]

    const result = filterSelectedFiles([invalid, ...valid], {
      maxFiles: 2,
      acceptedFileTypes: ACCEPT,
    })

    expect(result.accepted).toEqual(valid.slice(0, 2))
    expect(result.rejected.map(({ reason }) => reason)).toEqual(['invalid-type', 'too-many'])
  })
})

describe('describeRejectedFiles', () => {
  it('returns null when nothing was rejected', () => {
    expect(describeRejectedFiles([])).toBeNull()
  })

  it('summarises every distinct reason once', () => {
    const rejected = [
      { file: file('a.png'), reason: 'too-large' as const },
      { file: file('b.png'), reason: 'too-large' as const },
      { file: file('c.exe'), reason: 'invalid-type' as const },
    ]

    expect(describeRejectedFiles(rejected, { maxFileSize: 1024 * 1024 })).toBe(
      '3 files were not added (over 1.00 MB, unsupported type).',
    )
  })

  it('names the count limit', () => {
    expect(
      describeRejectedFiles([{ file: file('a.pdf'), reason: 'too-many' }], { maxFiles: 5 }),
    ).toBe('1 file was not added (more than 5 at once).')
  })
})
