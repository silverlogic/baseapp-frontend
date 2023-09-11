import { buildQueryString } from '..'

describe('buildQueryString', () => {
  it('should convert an object into a query string', () => {
    const params = { name: 'John', age: 30 }

    const result = buildQueryString(params)

    expect(result).toBe('name=John&age=30')
  })

  it('should handle arrays with repeat format', () => {
    const params = { colors: ['red', 'green', 'blue'] }

    const result = buildQueryString(params)

    expect(result).toBe('colors=red&colors=green&colors=blue')
  })

  it('should handle nested objects', () => {
    const params = { person: { name: 'John', age: 30 } }

    const result = buildQueryString(params)

    expect(result).toBe('person%5Bname%5D=John&person%5Bage%5D=30')
  })
})
