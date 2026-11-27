import { resolveHeaderPress } from '../utils'

describe('resolveHeaderPress', () => {
  const fallback = jest.fn()

  it('keeps the default when no override is given', () => {
    expect(resolveHeaderPress(undefined, fallback)).toBe(fallback)
  })

  it('uses the override when given', () => {
    const override = jest.fn()
    expect(resolveHeaderPress(override, fallback)).toBe(override)
  })

  it('makes the header not tappable when the override is null', () => {
    expect(resolveHeaderPress(null, fallback)).toBeUndefined()
  })
})
