import { toggleGroupSelection } from '../toggleGroupSelection'

describe('toggleGroupSelection', () => {
  it('adds a group id that is not selected', () => {
    const result = toggleGroupSelection(new Set(), 'group-1')

    expect(result.has('group-1')).toBe(true)
    expect(result.size).toBe(1)
  })

  it('removes a group id that is already selected', () => {
    const result = toggleGroupSelection(new Set(['group-1', 'group-2']), 'group-1')

    expect(result.has('group-1')).toBe(false)
    expect(result.has('group-2')).toBe(true)
    expect(result.size).toBe(1)
  })

  it('does not mutate the previous selection', () => {
    const previous = new Set(['group-1'])

    const result = toggleGroupSelection(previous, 'group-2')

    expect(previous.size).toBe(1)
    expect(previous.has('group-2')).toBe(false)
    expect(result.size).toBe(2)
  })
})
