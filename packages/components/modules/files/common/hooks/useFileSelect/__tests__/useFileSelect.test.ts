import { renderHook } from '@testing-library/react'

import { useFileSelect } from '../index'

const makeFile = (name: string, size: number) => {
  const file = new File(['x'], name)
  Object.defineProperty(file, 'size', { value: size })
  return file
}

const fireChange = (
  onChange: (event: { target: { files: File[]; value: string } }) => void,
  files: File[],
) => {
  const target = { files, value: 'C:\\fakepath\\x' }
  onChange({ target } as never)
  return target
}

describe('useFileSelect', () => {
  it('builds the accept attribute from mime types and extensions', () => {
    const { result } = renderHook(() =>
      useFileSelect({
        onFilesSelected: jest.fn(),
        acceptedFileTypes: { 'image/*': ['.png', '.jpg'], 'application/pdf': ['.pdf'] },
      }),
    )
    expect(result.current.getInputProps().accept).toBe('image/*,.png,.jpg,application/pdf,.pdf')
  })

  it('sets multiple only when maxFiles > 1', () => {
    const single = renderHook(() => useFileSelect({ onFilesSelected: jest.fn(), maxFiles: 1 }))
    const many = renderHook(() => useFileSelect({ onFilesSelected: jest.fn(), maxFiles: 5 }))
    expect(single.result.current.getInputProps().multiple).toBe(false)
    expect(many.result.current.getInputProps().multiple).toBe(true)
  })

  it('filters out files over maxFileSize and caps at maxFiles', () => {
    const onFilesSelected = jest.fn()
    const { result } = renderHook(() =>
      useFileSelect({ onFilesSelected, maxFiles: 2, maxFileSize: 1000 }),
    )

    const ok1 = makeFile('a.txt', 500)
    const tooBig = makeFile('big.txt', 5000)
    const ok2 = makeFile('b.txt', 800)
    const ok3 = makeFile('c.txt', 900)

    fireChange(result.current.getInputProps().onChange, [ok1, tooBig, ok2, ok3])

    expect(onFilesSelected).toHaveBeenCalledTimes(1)
    // tooBig filtered out, then capped to 2 → [ok1, ok2]
    expect(onFilesSelected).toHaveBeenCalledWith([ok1, ok2])
  })

  it('does not fire the callback when nothing valid was selected, and resets the input', () => {
    const onFilesSelected = jest.fn()
    const { result } = renderHook(() => useFileSelect({ onFilesSelected, maxFileSize: 100 }))

    const target = fireChange(result.current.getInputProps().onChange, [makeFile('big', 999)])

    expect(onFilesSelected).not.toHaveBeenCalled()
    expect(target.value).toBe('')
  })

  it('open() does not throw when no input is mounted and respects disabled', () => {
    const { result } = renderHook(() =>
      useFileSelect({ onFilesSelected: jest.fn(), disabled: true }),
    )
    expect(() => result.current.open()).not.toThrow()
    expect(result.current.getInputProps().disabled).toBe(true)
  })
})
