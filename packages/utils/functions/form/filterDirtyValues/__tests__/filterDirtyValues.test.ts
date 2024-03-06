import { filterDirtyValues } from '..'

describe('filterDirtyValues', () => {
  it('should return all values when all fields are marked as dirty', () => {
    const values = { name: 'John Doe', age: 20, email: 'johndoe@email.com' }
    const dirtyFields = { name: true, age: true, email: true }
    const result = filterDirtyValues({ values, dirtyFields })
    expect(result).toEqual(values)
  })

  it('should return an empty object when no fields are marked as dirty', () => {
    const values = { name: 'John Doe', age: 20, email: 'johndoe@email.com' }
    const dirtyFields = { name: false, age: false, email: false }
    const result = filterDirtyValues({ values, dirtyFields })
    expect(result).toEqual({})
  })

  it('should only return dirty fields', () => {
    const values = { name: 'John Doe', age: 20, email: 'johndoe@email.com' }
    const dirtyFields = { name: true, age: false, email: false }
    const result = filterDirtyValues({ values, dirtyFields })
    expect(result).toEqual({ name: 'John Doe' })
  })

  it('should ignore dirty fields not present in values', () => {
    const values = { name: 'John Doe', age: 20 }
    const dirtyFields = { name: true, email: true }
    const result = filterDirtyValues({ values, dirtyFields })
    expect(result).toEqual({ name: 'John Doe' })
  })

  it('should correctly handle dirty fields object with non-boolean properties', () => {
    const values = { name: 'John Doe', age: 20, email: 'johndoe@email.com' }
    const dirtyFields = { name: true, age: 'changed', email: true }
    const result = filterDirtyValues({ values, dirtyFields })
    expect(result).toEqual({ name: 'John Doe', age: 20, email: 'johndoe@email.com' })
  })
})
