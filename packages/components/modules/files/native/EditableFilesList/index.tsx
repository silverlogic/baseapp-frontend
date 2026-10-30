import type { FC } from 'react'

import { ScrollView } from 'react-native-gesture-handler'
import { useFragment } from 'react-relay'

import { useScopedUploads } from '../../common/context/useScopedUploads'
import { FilesListFragment } from '../../common/graphql/queries/FilesList'
import AttachedFileChip from '../AttachedFilesList/AttachedFileChip'
import UploadingFileChip from '../UploadingFilesList/UploadingFileChip'
import { createStyles } from './styles'
import type { EditableFilesListProps } from './types'

/**
 * One row for editing a target's files: uploads in progress first, then the attached
 * files, each with a remove button.
 */
const EditableFilesList: FC<EditableFilesListProps> = ({
  target: targetRef,
  scope,
  onRemoveFile,
  shouldUseBottomSheetSafeComponents = false,
}) => {
  const target = useFragment(FilesListFragment, targetRef ?? null)
  const uploadingFiles = useScopedUploads(scope)
  const styles = createStyles()
  const attached = (target?.files?.edges ?? []).flatMap((edge) =>
    edge?.node ? [edge.node] : [],
  )

  if (!uploadingFiles.length && !attached.length) {
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
          shouldUseBottomSheetSafeComponents={shouldUseBottomSheetSafeComponents}
        />
      ))}
      {attached.map((file) => (
        <AttachedFileChip
          key={file.id}
          file={file}
          onRemove={onRemoveFile}
          shouldUseBottomSheetSafeComponents={shouldUseBottomSheetSafeComponents}
        />
      ))}
    </ScrollView>
  )
}

export default EditableFilesList
export type { EditableFilesListProps } from './types'
