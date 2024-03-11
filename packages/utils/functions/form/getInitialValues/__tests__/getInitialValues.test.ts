import { getInitialValues } from '..'

describe('getInitialValues', () => {
  it('should pick properties from current that exist in initial when current is truthy', () => {
    const current = { a: 1, b: 2 }
    const initial = { a: 0 }
    const result = getInitialValues({ current, initial })
    expect(result).toEqual({ a: 1 })
  })

  it('should return an empty object when current is truthy but has no overlapping keys with initial', () => {
    const current = { c: 3, d: 4 }
    const initial = { a: 0, b: 1 }
    const result = getInitialValues({ current, initial })
    expect(result).toEqual({})
  })

  it('should return initial when current is falsy', () => {
    const current = undefined
    const initial = { a: 0, b: 1 }
    const result = getInitialValues({ current, initial })
    expect(result).toBe(initial)
  })

  it('should work with complex objects as current and initial', () => {
    const current = { a: { nested: true }, b: 2 }
    const initial = { a: { nested: false } }
    const result = getInitialValues({ current, initial })
    expect(result).toEqual({ a: { nested: true } })
  })

  it('should ignore additional properties in current not present in initial', () => {
    const current = { a: 1, b: 2, extra: 'ignored' }
    const initial = { a: 0 }
    const result = getInitialValues({ current, initial })
    expect(result).toEqual({ a: 1 })
  })
})
