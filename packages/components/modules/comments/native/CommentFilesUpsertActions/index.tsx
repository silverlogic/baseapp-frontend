import type { FC } from 'react'

import { AttachmentIcon, ImageIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { Pressable } from 'react-native'

import { useNativeFilePicker } from '../../../files/native'
import { COMMENT_FILE_ATTACHMENT_LIMITS } from '../../common'
import { createStyles } from './styles'
import type { CommentFilesUpsertActionsProps } from './types'

/**
 * Native upsert-action bar for the comment composer: photos come from the photo
 * library, other files from the document picker. Uploads start right away and are
 * attached once the comment is created.
 */
const CommentFilesUpsertActions: FC<CommentFilesUpsertActionsProps> = ({
  onFilesSelected,
  disabled = false,
  shouldUseBottomSheetSafeComponents = false,
}) => {
  const theme = useTheme()
  const styles = createStyles()
  const { pickImages, pickDocuments, isPreparing } = useNativeFilePicker({
    onFilesSelected,
    disabled,
    ...COMMENT_FILE_ATTACHMENT_LIMITS,
  })
  const Touchable = shouldUseBottomSheetSafeComponents ? TouchableOpacity : Pressable
  const isDisabled = disabled || isPreparing
  const color = isDisabled ? theme.colors.object.disabled : theme.colors.object.low

  return (
    <View style={styles.container}>
      <Touchable
        onPress={pickImages}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityLabel="Attach photos"
        style={styles.button}
      >
        <ImageIcon width={20} height={20} color={color} />
      </Touchable>
      <Touchable
        onPress={pickDocuments}
        disabled={isDisabled}
        accessibilityRole="button"
        accessibilityLabel="Attach files"
        style={styles.button}
      >
        <AttachmentIcon width={20} height={20} color={color} />
      </Touchable>
    </View>
  )
}

export default CommentFilesUpsertActions
export type { CommentFilesUpsertActionsProps } from './types'
