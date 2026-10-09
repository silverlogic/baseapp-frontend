import { getFileTypeLabel } from '../formatters'

describe('getFileTypeLabel', () => {
  it('uses the extension when the name has one', () => {
    expect(getFileTypeLabel('report.final.pdf', 'application/pdf')).toBe('PDF')
  })

  it('falls back to the content-type category', () => {
    expect(getFileTypeLabel('scan', 'image/png')).toBe('IMAGE')
    expect(getFileTypeLabel(null, null)).toBe('OTHER')
  })
})
