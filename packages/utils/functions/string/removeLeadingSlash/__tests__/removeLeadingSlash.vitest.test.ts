import { removeLeadingSlash } from '../index'

describe('removeLeadingSlash', () => {
  it('strips a single leading slash', () => {
    expect(removeLeadingSlash('/handle')).toBe('handle')
  })

  it('returns the input unchanged when there is no leading slash', () => {
    expect(removeLeadingSlash('handle')).toBe('handle')
  })

  it('strips only one slash, leaving inner slashes intact', () => {
    expect(removeLeadingSlash('/foo/bar')).toBe('foo/bar')
  })

  it('returns the empty string for the empty string', () => {
    expect(removeLeadingSlash('')).toBe('')
  })

  it('handles a slash-only input', () => {
    expect(removeLeadingSlash('/')).toBe('')
  })
})
