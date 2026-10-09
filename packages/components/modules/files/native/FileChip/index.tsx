import type { FC } from 'react'

import { AttachmentIcon, ImageIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { Image } from '@baseapp-frontend/design-system/components/native/images'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { Pressable } from 'react-native'

import { isImageFile } from '../../common/utils/formatters'
import { THUMBNAIL_SIZE, createStyles } from './styles'
import type { FileChipProps } from './types'

/** Compact file tile shared by uploading and attached files (native `FileChip`). */
const FileChip: FC<FileChipProps> = ({
  name,
  contentType,
  thumbnailUrl,
  subtitle,
  action,
  onPress,
  shouldUseBottomSheetSafeComponents = false,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const Touchable = shouldUseBottomSheetSafeComponents ? TouchableOpacity : Pressable

  const renderThumbnail = () => {
    if (thumbnailUrl) {
      return <Image source={{ uri: thumbnailUrl }} width={THUMBNAIL_SIZE} height={THUMBNAIL_SIZE} />
    }
    return isImageFile(contentType) ? (
      <ImageIcon width={20} height={20} color={theme.colors.object.low} />
    ) : (
      <AttachmentIcon width={20} height={20} color={theme.colors.object.low} />
    )
  }

  return (
    <View style={styles.container}>
      <Touchable
        onPress={onPress}
        disabled={!onPress}
        accessibilityRole={onPress ? 'button' : undefined}
        accessibilityLabel={name}
        style={styles.pressArea}
      >
        <View style={styles.thumbnail}>{renderThumbnail()}</View>
        <View style={styles.body}>
          <Text variant="caption" color="high" numberOfLines={1}>
            {name}
          </Text>
          {subtitle}
        </View>
      </Touchable>
      {action}
    </View>
  )
}

export default FileChip
export type { FileChipProps } from './types'
