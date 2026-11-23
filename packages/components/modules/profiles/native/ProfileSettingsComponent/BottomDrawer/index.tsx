import { FC } from 'react'

import { BottomDrawer as BaseAppBottomDrawer } from '@baseapp-frontend/design-system/components/native/drawers'
import {
  CameraOutlinedIcon,
  FlowerIcon,
  TrashIcon,
} from '@baseapp-frontend/design-system/components/native/icons'
import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { FormattedMessage } from 'react-intl'
import { Pressable } from 'react-native'

import { createStyles } from './styles'
import { BottomDrawerProps } from './types'

const BottomDrawer: FC<BottomDrawerProps> = ({
  bottomDrawerRef,
  handleSheetChanges,
  type = 'image',
  handleViewPhotoLibrary,
  handleTakePhoto,
  handleRemoveImage,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme)

  return (
    <BaseAppBottomDrawer bottomDrawerRef={bottomDrawerRef} handleSheetChanges={handleSheetChanges}>
      <View style={styles.modalContent}>
        <View style={styles.modalItem}>
          <Text variant="body2" color="low">
            <FormattedMessage
              id="profiles.settingsDrawer.uploadNew"
              defaultMessage="Upload a new {type, select, image {image} other {banner}}"
              values={{ type }}
            />
          </Text>
        </View>
        <Pressable onPress={handleViewPhotoLibrary} style={styles.modalItem}>
          <FlowerIcon width={20} height={20} color={theme.colors.object.high} />
          <Text variant="body2" color="high">
            <FormattedMessage
              id="profiles.settingsDrawer.viewPhotoLibrary"
              defaultMessage="View photo library"
            />
          </Text>
        </Pressable>
        <Pressable onPress={handleTakePhoto} style={styles.modalItem}>
          <CameraOutlinedIcon width={20} height={20} color={theme.colors.object.high} />
          <Text variant="body2" color="high">
            <FormattedMessage
              id="profiles.settingsDrawer.takePhoto"
              defaultMessage="Take a photo"
            />
          </Text>
        </Pressable>
      </View>
      <View style={[styles.modalContent, { borderBottomWidth: 0 }]}>
        <Pressable onPress={() => handleRemoveImage(type)} style={styles.modalItem}>
          <TrashIcon width={20} height={20} color={theme.colors.error.main} />
          <Text variant="body2" style={{ color: theme.colors.error.main }}>
            <FormattedMessage
              id="profiles.settingsDrawer.remove"
              defaultMessage="Remove {type, select, image {image} other {banner}}"
              values={{ type }}
            />
          </Text>
        </Pressable>
      </View>
    </BaseAppBottomDrawer>
  )
}

export default BottomDrawer
