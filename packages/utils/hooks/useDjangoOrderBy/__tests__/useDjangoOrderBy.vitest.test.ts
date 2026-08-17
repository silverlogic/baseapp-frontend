import { act, renderHook } from '@baseapp-frontend/test'

import useDjangoOrderBy from '../index'

describe('useDjangoOrderBy', () => {
  it('should initialize ordering pairs with default values', () => {
    const defaultPairs = { name: 'asc', age: 'desc' } as const

    const { result } = renderHook(() => useDjangoOrderBy({ defaultPairs }))

    expect(result.current.orderBy).toBe('name,-age')
  })

  it('should toggle the order when handleOrderBy is called', () => {
    const defaultPairs = { name: 'asc', age: 'desc' } as const

    const { result } = renderHook(() => useDjangoOrderBy({ defaultPairs }))

    act(() => {
      result.current.handleOrderBy(['name'])
    })
    expect(result.current.orderBy).toBe('-name,-age')

    act(() => {
      result.current.handleOrderBy(['name', 'age'])
    })
    expect(result.current.orderBy).toBe('name,age')

    act(() => {
      result.current.handleOrderBy(['age'])
    })
    expect(result.current.orderBy).toBe('name,-age')
  })

  it('should use custom descendingOrderPrefix if provided', () => {
    const defaultPairs = { name: 'asc', age: 'asc' } as const
    const descendingOrderPrefix = '!'

    const { result } = renderHook(() => useDjangoOrderBy({ defaultPairs, descendingOrderPrefix }))

    act(() => {
      result.current.handleOrderBy(['name', 'age'])
    })

    expect(result.current.orderBy).toBe('!name,!age')
  })
})
