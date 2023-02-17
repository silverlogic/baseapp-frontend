/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'

import { useLocalStorage } from '../src/storage'

const localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
  removeItem: jest.fn(),
}

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', {
    value: localStorage,
    writable: true,
  })
})

describe('useLocalStorage', () => {
  test('save state properly', () => {
    render(<div />)
    const { result } = renderHook(() => useLocalStorage<string>('test', 'test'))
    const [test, setTest] = result.current
    expect(test).toBe('test')
    act(() => setTest('changed'))
    expect(localStorage.setItem).toBeCalledWith('test', '"changed"')
  })

  test('load state properly', () => {
    localStorage.setItem('test', 'test')
    const { result } = renderHook(() => useLocalStorage('test', 'test'))
    const [test] = result.current
    expect(test).toBe('test')
  })
})
