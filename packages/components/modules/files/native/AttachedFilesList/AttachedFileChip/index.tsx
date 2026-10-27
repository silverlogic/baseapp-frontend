import type { FC } from 'react'

import { CloseIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'
import { useNotification } from '@baseapp-frontend/utils'

import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { Linking, Pressable } from 'react-native'
import { useFragment } from 'react-relay'

import { FileItemFragment } from '../../../common/graphql/fragments/FileItem'
import { useFileDownloadLogic } from '../../../common/hooks/useFileDownloadLogic'
import { getFileTypeLabel } from '../../../common/utils/formatters'
import FileChip from '../../FileChip'
import { createStyles } from './styles'
import type { AttachedFileChipProps } from './types'

/**
 * Chip for a file already attached to its target; tapping opens it in the system viewer
 * (disabled when the viewer gets no url).
 * With `onRemove`, files the viewer may change get a remove button.
 */
const AttachedFileChip: FC<AttachedFileChipProps> = ({
  file: fileRef,
  onRemove,
  shouldUseBottomSheetSafeComponents = false,
}) => {
  const file = useFragment(FileItemFragment, fileRef)
  const theme = useTheme()
  const styles = createStyles()
  const { sendToast } = useNotification()
  const Touchable = shouldUseBottomSheetSafeComponents ? TouchableOpacity : Pressable

  const { handleDownload } = useFileDownloadLogic({
    downloadHandler: (url) => Linking.openURL(url),
    onError: () => sendToast('Could not open the file.', { type: 'error' }),
  })

  return (
    <FileChip
      name={file.fileName ?? 'File'}
      contentType={file.fileContentType}
      thumbnailUrl={file.thumbnail}
      // Private files have no url for viewers without access.
      onPress={file.url ? () => handleDownload(file.url, file.fileName ?? undefined) : undefined}
      shouldUseBottomSheetSafeComponents={shouldUseBottomSheetSafeComponents}
      action={
        onRemove && file.hasPerm ? (
          <Touchable
            onPress={() => onRemove(file.id)}
            accessibilityRole="button"
            accessibilityLabel="Remove file"
            style={styles.action}
          >
            <CloseIcon width={18} height={18} color={theme.colors.object.low} />
          </Touchable>
        ) : null
      }
      subtitle={
        <Text variant="caption" color="low">
          {getFileTypeLabel(file.fileName, file.fileContentType)}
        </Text>
      }
    />
  )
}

export default AttachedFileChip
export type { AttachedFileChipProps } from './types'
