import { getLastMessagePreview } from '../utils'

describe('getLastMessagePreview', () => {
  it('strips the underline tags the editor serializes as raw HTML', () => {
    expect(getLastMessagePreview('<u>HEllo</u>')).toBe('HEllo')
  })

  it('strips bold, italic, underline, strikethrough and inline code applied together', () => {
    expect(getLastMessagePreview('***~~<u>`HEllo`</u>~~***')).toBe('HEllo')
  })

  it('strips markdown formatting', () => {
    expect(getLastMessagePreview('**bold** _italic_ ~~strike~~')).toBe('bold italic strike')
  })

  it('keeps angle brackets that are not formatting tags', () => {
    expect(getLastMessagePreview('a < b and c > d')).toBe('a < b and c > d')
    expect(getLastMessagePreview('<div>kept</div>')).toBe('<div>kept</div>')
  })

  it('returns the first non-empty line', () => {
    expect(getLastMessagePreview('<u></u>\nsecond line')).toBe('second line')
  })

  it('treats <br> as a line break instead of joining the words around it', () => {
    expect(getLastMessagePreview('one<br>two')).toBe('one')
    expect(getLastMessagePreview('<br/><u>HEllo</u>')).toBe('HEllo')
  })

  it('returns an empty string for empty content', () => {
    expect(getLastMessagePreview(null)).toBe('')
    expect(getLastMessagePreview('')).toBe('')
  })
})
