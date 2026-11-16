import { withFileExtension } from '../withFileExtension'

describe('withFileExtension', () => {
  it('adds the extension for a name without one', () => {
    expect(withFileExtension('1000012345', 'image/jpeg')).toBe('1000012345.jpg')
    expect(withFileExtension('clip', 'video/quicktime')).toBe('clip.mov')
  })

  it('keeps an existing extension', () => {
    expect(withFileExtension('report.PDF', 'application/pdf')).toBe('report.PDF')
    expect(withFileExtension('photo.png', 'image/jpeg')).toBe('photo.png')
  })

  it('renames a HEIC photo that was converted to JPEG', () => {
    expect(withFileExtension('IMG_0001.HEIC', 'image/jpeg')).toBe('IMG_0001.jpg')
  })

  it('leaves the name alone when the type is unknown', () => {
    expect(withFileExtension('blob', 'application/octet-stream')).toBe('blob')
    expect(withFileExtension('blob', null)).toBe('blob')
  })
})
