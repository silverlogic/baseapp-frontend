import { formatFileSize } from '../formatters'

describe('formatFileSize', () => {
  it('scales from bytes up to gigabytes', () => {
    expect(formatFileSize(512)).toBe('512 B')
    expect(formatFileSize(150 * 1024 * 1024)).toBe('150.00 MB')
    expect(formatFileSize(5 * 1024 * 1024 * 1024)).toBe('5.00 GB')
  })
})
