import type { FC } from 'react'

import { ScrollView } from 'react-native-gesture-handler'

import { useScopedUploads } from '../../common/context/useScopedUploads'
import UploadingFileChip from './UploadingFileChip'
import { createStyles } from './styles'
import type { UploadingFilesListProps } from './types'

/**
 * Horizontal row of one scope's in-progress uploads, for composers that upload before
 * their target exists (native counterpart of the web `UploadingFilesList`).
 */
const UploadingFilesList: FC<UploadingFilesListProps> = ({
  scope,
  allowRemove = true,
  allowRetry = true,
  shouldUseBottomSheetSafeComponents = false,
}) => {
  const uploadingFiles = useScopedUploads(scope)
  const styles = createStyles()

  if (!uploadingFiles.length) {
    return null
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.content}
    >
      {uploadingFiles.map((file) => (
        <UploadingFileChip
          key={file.id}
          fileProgress={file}
          allowRemove={allowRemove}
          allowRetry={allowRetry}
          shouldUseBottomSheetSafeComponents={shouldUseBottomSheetSafeComponents}
        />
      ))}
    </ScrollView>
  )
}

export default UploadingFilesList
export type { UploadingFilesListProps } from './types'
