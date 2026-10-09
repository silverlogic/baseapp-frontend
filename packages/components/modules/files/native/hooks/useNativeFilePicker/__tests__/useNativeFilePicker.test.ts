import { act, renderHook } from '@testing-library/react'
import { vi } from 'vitest'

import { useNativeFilePicker } from '../index'

const sendToast = vi.fn()
vi.mock('@baseapp-frontend/utils', () => ({ useNotification: () => ({ sendToast }) }))

const launchImageLibraryAsync = vi.fn()
vi.mock('expo-image-picker', () => ({
  launchImageLibraryAsync: (...args: unknown[]) => launchImageLibraryAsync(...args),
  UIImagePickerPreferredAssetRepresentationMode: { Compatible: 'compatible' },
}))

const pickFileAsync = vi.fn()
vi.mock('expo-file-system', () => ({
  File: class {
    static pickFileAsync = (...args: unknown[]) => pickFileAsync(...args)
  },
}))

const createNativeUploadSource = vi.fn()
vi.mock('../../../utils/createNativeUploadSource', () => ({
  createNativeUploadSource: (descriptor: unknown) => createNativeUploadSource(descriptor),
}))

const LIMITS = {
  maxFiles: 5,
  maxFileSize: 1000,
  acceptedFileTypes: { 'image/*': ['.png', '.jpg'], 'application/pdf': ['.pdf'] },
}

const sourceFor = ({ name, size = 10 }: { name: string; size?: number }) => ({
  name,
  size,
  type: '',
  readChunk: vi.fn(),
  dispose: vi.fn(),
})

const asset = (fileName: string, fileSize = 10, mimeType = 'image/jpeg') => ({
  uri: `file:///cache/${fileName}`,
  fileName,
  fileSize,
  mimeType,
})

const setup = () => {
  const onFilesSelected = vi.fn()
  const { result } = renderHook(() => useNativeFilePicker({ onFilesSelected, ...LIMITS }))
  return { onFilesSelected, result }
}

describe('useNativeFilePicker', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    createNativeUploadSource.mockImplementation(async (descriptor) => sourceFor(descriptor))
  })

  it('hands the accepted photos to the uploader and explains the rest', async () => {
    launchImageLibraryAsync.mockResolvedValue({
      canceled: false,
      assets: [asset('a.jpg'), asset('huge.jpg', 5000)],
    })
    const { onFilesSelected, result } = setup()

    await act(() => result.current.pickImages())

    expect(launchImageLibraryAsync).toHaveBeenCalledWith(
      expect.objectContaining({ allowsMultipleSelection: true, selectionLimit: 5 }),
    )
    expect(onFilesSelected).toHaveBeenCalledWith([expect.objectContaining({ name: 'a.jpg' })])
    expect(createNativeUploadSource).toHaveBeenCalledTimes(1)
    expect(sendToast).toHaveBeenCalledWith('1 file was not added (over 1000 B).', {
      type: 'warning',
    })
  })

  it('does nothing when the photo picker is cancelled', async () => {
    launchImageLibraryAsync.mockResolvedValue({ canceled: true, assets: null })
    const { onFilesSelected, result } = setup()

    await act(() => result.current.pickImages())

    expect(onFilesSelected).not.toHaveBeenCalled()
    expect(sendToast).not.toHaveBeenCalled()
  })

  it('toasts when the photo library cannot open', async () => {
    launchImageLibraryAsync.mockRejectedValue(new Error('no activity'))
    const { result } = setup()

    await act(() => result.current.pickImages())

    expect(sendToast).toHaveBeenCalledWith('Could not open the photo library.', { type: 'error' })
  })

  it('filters the document picker to the one non-image type and stays quiet on cancel', async () => {
    pickFileAsync.mockRejectedValue(new Error('File picking was cancelled by the user'))
    const { onFilesSelected, result } = setup()

    await act(() => result.current.pickDocuments())

    expect(pickFileAsync).toHaveBeenCalledWith(undefined, 'application/pdf')
    expect(onFilesSelected).not.toHaveBeenCalled()
    expect(sendToast).not.toHaveBeenCalled()
  })

  it('keeps the readable files when one cannot be prepared, and drops empty ones', async () => {
    launchImageLibraryAsync.mockResolvedValue({
      canceled: false,
      assets: [asset('ok.jpg'), asset('broken.jpg'), asset('empty.jpg')],
    })
    const empty = sourceFor({ name: 'empty.jpg', size: 0 })
    createNativeUploadSource.mockImplementation(async ({ name }) => {
      if (name === 'broken.jpg') throw new Error('copy failed')
      return name === 'empty.jpg' ? empty : sourceFor({ name })
    })
    const { onFilesSelected, result } = setup()

    await act(() => result.current.pickImages())

    expect(onFilesSelected).toHaveBeenCalledWith([expect.objectContaining({ name: 'ok.jpg' })])
    expect(empty.dispose).toHaveBeenCalled()
    expect(sendToast).toHaveBeenCalledWith('Some files could not be read.', { type: 'error' })
  })
})
