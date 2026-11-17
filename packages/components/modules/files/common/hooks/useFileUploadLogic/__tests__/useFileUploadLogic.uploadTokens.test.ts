import { type ReactNode, createElement } from 'react'

import { act, renderHook } from '@testing-library/react'
import { IntlProvider } from 'react-intl'
import { vi } from 'vitest'

import { FileUploadStatus } from '../../../constants'
import { useFileUploadStore } from '../../../context/FileUploadProvider'
import { useFileUploadLogic } from '../index'

const IntlWrapper = ({ children }: { children: ReactNode }) =>
  createElement(IntlProvider, { locale: 'en' }, children)
const renderWithIntl = <Result>(callback: () => Result) =>
  renderHook(callback, { wrapper: IntlWrapper })

const mockUploadFile = vi.fn()

vi.mock('react-relay', () => ({
  ConnectionHandler: { getConnectionID: (id: string) => `connection:${id}` },
}))

vi.mock('../../../graphql/mutations/FileAttachToTarget', () => ({
  useFileAttachToTargetMutation: () => [vi.fn(), false],
}))

vi.mock('../../useChunkedUpload', () => ({
  useChunkedUpload: () => ({ uploadFile: mockUploadFile }),
}))

const TARGET = 'Comment:1'

/** Like useChunkedUpload: the finished upload is in the store, with its token if anonymous. */
const finishUpload = (relayId: string, uploadToken?: string) => (file: File, scope?: string) => {
  const { addFile, updateFileProgress } = useFileUploadStore.getState()
  const id = addFile(file, scope)
  updateFileProgress(id, {
    status: FileUploadStatus.COMPLETED,
    fileRelayId: relayId,
    uploadToken,
  })
  return Promise.resolve(relayId)
}

describe('useFileUploadLogic upload tokens', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useFileUploadStore.setState({ files: new Map() })
  })

  it('hands the caller the upload tokens when it attaches files itself', async () => {
    mockUploadFile.mockImplementation(finishUpload('File:1', 'token-1'))
    const onUploadComplete = vi.fn()
    const { result } = renderWithIntl(() =>
      useFileUploadLogic({ targetObjectId: TARGET, autoAttach: false, onUploadComplete }),
    )

    await act(async () => {
      await result.current.handleFilesSelected([new File(['x'], 'doc.pdf')])
    })

    expect(onUploadComplete).toHaveBeenCalledWith(['File:1'], ['token-1'])
    // The store no longer has the file, so the callback is the only place left for the token.
    expect(useFileUploadStore.getState().files.size).toBe(0)
  })

  it('passes no tokens for logged-in uploads', async () => {
    mockUploadFile.mockImplementation(finishUpload('File:1'))
    const onUploadComplete = vi.fn()
    const { result } = renderWithIntl(() =>
      useFileUploadLogic({ targetObjectId: TARGET, autoAttach: false, onUploadComplete }),
    )

    await act(async () => {
      await result.current.handleFilesSelected([new File(['x'], 'doc.pdf')])
    })

    expect(onUploadComplete).toHaveBeenCalledWith(['File:1'], [])
  })
})
