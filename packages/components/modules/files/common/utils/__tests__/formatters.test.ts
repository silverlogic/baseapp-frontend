import { formatFileSize, getFileTypeLabel } from '../formatters'

describe('getFileTypeLabel', () => {
  it('uses the extension when the name has one', () => {
    expect(getFileTypeLabel('report.final.pdf', 'application/pdf')).toBe('PDF')
  })

  it('falls back to the content-type category', () => {
    expect(getFileTypeLabel('scan', 'image/png')).toBe('IMAGE')
    expect(getFileTypeLabel(null, null)).toBe('OTHER')
  })
})

describe('formatFileSize', () => {
  it('scales from bytes up to gigabytes', () => {
    expect(formatFileSize(512)).toBe('512 B')
    expect(formatFileSize(150 * 1024 * 1024)).toBe('150.00 MB')
    expect(formatFileSize(5 * 1024 * 1024 * 1024)).toBe('5.00 GB')
  })
})
