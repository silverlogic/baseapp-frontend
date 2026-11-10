import { FileUploadStatus } from '../../constants'
import { getUploadItemActions, getUploadPercent } from '../uploadItemState'

describe('getUploadItemActions', () => {
  it('offers pause only while uploading, and resume only when paused', () => {
    expect(getUploadItemActions(FileUploadStatus.UPLOADING)).toEqual({
      canPause: true,
      canResume: false,
      canRetry: false,
      canRemove: false,
    })
    expect(getUploadItemActions(FileUploadStatus.PAUSED)).toMatchObject({
      canResume: true,
      canRemove: true,
    })
  })

  it('lets a completed-but-unattached upload be removed', () => {
    expect(getUploadItemActions(FileUploadStatus.COMPLETED).canRemove).toBe(true)
  })

  it('honours allowRemove / allowRetry', () => {
    expect(getUploadItemActions(FileUploadStatus.FAILED)).toMatchObject({
      canRetry: true,
      canRemove: true,
    })
    expect(
      getUploadItemActions(FileUploadStatus.FAILED, { allowRemove: false, allowRetry: false }),
    ).toMatchObject({ canRetry: false, canRemove: false })
  })
})

describe('getUploadPercent', () => {
  it('reports byte progress, and 100 once completed', () => {
    expect(
      getUploadPercent({ status: FileUploadStatus.UPLOADING, uploadedBytes: 25, fileSize: 100 }),
    ).toBe(25)
    expect(
      getUploadPercent({ status: FileUploadStatus.COMPLETED, uploadedBytes: 0, fileSize: 100 }),
    ).toBe(100)
  })
})
