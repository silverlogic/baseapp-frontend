import { joinWithSeparator } from '..'

describe('joinWithSeparator', () => {
  it('should join list items with a space by default', () => {
    const result = joinWithSeparator(['a', 'b', 'c'])
    expect(result).toBe('a b c')
  })

  it('should join list items with a custom separator', () => {
    const result = joinWithSeparator(['a', 'b', 'c'], { separator: ',' })
    expect(result).toBe('a,b,c')
  })

  it('should omit falsy values from the list', () => {
    const result = joinWithSeparator(['a', null, 'b', undefined, '', 'c', false, 0])
    expect(result).toBe('a b c')
  })

  it('should return an empty string if the list is empty', () => {
    const result = joinWithSeparator([])
    expect(result).toBe('')
  })

  it('should return a custom fallback string if provided', () => {
    const result = joinWithSeparator([undefined, ''], { fallback: 'No data' })
    expect(result).toBe('No data')
  })

  it('should prioritize the joined string over the fallback', () => {
    const result = joinWithSeparator(['a'], { fallback: 'No data' })
    expect(result).toBe('a')
  })
})
