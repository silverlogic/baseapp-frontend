import type { FC } from 'react'

import { CloseIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { Pressable } from 'react-native'

import { FileUploadStatus } from '../../../common/constants'
import { useFileUploadStore } from '../../../common/context/FileUploadProvider'
import { useChunkedUpload } from '../../../common/hooks/useChunkedUpload'
import { formatFileSize } from '../../../common/utils/formatters'
import { getUploadItemActions, getUploadPercent } from '../../../common/utils/uploadItemState'
import FileChip from '../../FileChip'
import { createStyles } from './styles'
import type { UploadingFileChipProps } from './types'

/**
 * Native chip for an in-progress upload. There is no pause control on mobile: the close
 * button cancels a running upload outright, and a failed one retries on tap.
 */
const UploadingFileChip: FC<UploadingFileChipProps> = ({
  fileProgress,
  allowRemove = true,
  allowRetry = true,
  shouldUseBottomSheetSafeComponents = false,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme, getUploadPercent(fileProgress))
  const removeFile = useFileUploadStore((state) => state.removeFile)
  const { retryUpload } = useChunkedUpload()
  const Touchable = shouldUseBottomSheetSafeComponents ? TouchableOpacity : Pressable

  const {
    canPause: isUploading,
    canRetry,
    canRemove,
  } = getUploadItemActions(fileProgress.status, { allowRemove, allowRetry })

  const renderSubtitle = () => {
    if (fileProgress.error) {
      return (
        <Text variant="caption" style={styles.error} numberOfLines={1}>
          {canRetry ? 'Failed. Tap to retry' : fileProgress.error}
        </Text>
      )
    }
    if (fileProgress.status === FileUploadStatus.COMPLETED) {
      return (
        <Text variant="caption" color="low">
          {formatFileSize(fileProgress.fileSize)}
        </Text>
      )
    }
    return (
      <View style={styles.track}>
        <View style={styles.bar} />
      </View>
    )
  }

  return (
    <FileChip
      name={fileProgress.fileName}
      contentType={fileProgress.file.type}
      subtitle={renderSubtitle()}
      onPress={canRetry ? () => retryUpload(fileProgress.id) : undefined}
      shouldUseBottomSheetSafeComponents={shouldUseBottomSheetSafeComponents}
      action={
        allowRemove && (canRemove || isUploading) ? (
          <Touchable
            onPress={() => removeFile(fileProgress.id)}
            accessibilityRole="button"
            accessibilityLabel={isUploading ? 'Cancel upload' : 'Remove file'}
            style={styles.action}
          >
            <CloseIcon width={18} height={18} color={theme.colors.object.low} />
          </Touchable>
        ) : null
      }
    />
  )
}

export default UploadingFileChip
export type { UploadingFileChipProps } from './types'
