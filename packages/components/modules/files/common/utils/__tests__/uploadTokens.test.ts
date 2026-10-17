import { FileUploadStatus } from '../../constants'
import { useFileUploadStore } from '../../context/FileUploadProvider'
import { uploadTokensFor } from '../uploadTokens'

const addUpload = (fileRelayId: string, uploadToken?: string) => {
  const { addFile, updateFileProgress } = useFileUploadStore.getState()
  const id = addFile(new File(['x'], `${fileRelayId}.pdf`))
  updateFileProgress(id, { status: FileUploadStatus.COMPLETED, fileRelayId, uploadToken })
}

describe('uploadTokensFor', () => {
  beforeEach(() => {
    useFileUploadStore.setState({ files: new Map() })
  })

  it('returns the tokens of the requested anonymous uploads only', () => {
    addUpload('File:1', 'token-1')
    addUpload('File:2', 'token-2')
    addUpload('File:3')

    expect(uploadTokensFor(['File:1', 'File:3'])).toEqual(['token-1'])
  })

  it('is empty for logged-in uploads', () => {
    addUpload('File:1')

    expect(uploadTokensFor(['File:1'])).toEqual([])
  })
})
