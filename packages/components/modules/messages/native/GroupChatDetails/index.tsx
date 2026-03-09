import { useCallback, useRef } from 'react'

import { Button } from '@baseapp-frontend/design-system/components/native/buttons'
import { PictureIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { TextInput } from '@baseapp-frontend/design-system/components/native/inputs'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useViewPhotoLibrary } from '@baseapp-frontend/design-system/hooks/native'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { BottomSheetModal } from '@gorhom/bottom-sheet'
import * as ImagePicker from 'expo-image-picker'
import { Image, Platform } from 'react-native'

import BottomDrawer from '../../../profiles/native/ProfileSettingsComponent/BottomDrawer'
import { useGroupChatCreate } from '../../common/context/GroupChatProvider'
import { createStyles } from './styles'

const GroupChatDetails = () => {
  const theme = useTheme()
  const styles = createStyles(theme)
  const bottomDrawerRef = useRef<BottomSheetModal | undefined>(undefined)

  const groups = useGroupChatCreate()

  const handlePresentModalPress = useCallback(() => {
    bottomDrawerRef.current?.present()
  }, [])

  const handleSheetChanges = useCallback((index: number) => {
    // TODO: handle sheet changes
    console.log('index', index)
  }, [])

  const { handleViewPhotoLibrary, handleTakePhoto } = useViewPhotoLibrary({
    allowsEditing: Platform.OS === 'android',
    isBase64: false,
    onResult: (image?: ImagePicker.ImagePickerAsset) => {
      groups.setGroupChat({ ...groups, image: image?.uri })
    },
    onFinally: () => {
      bottomDrawerRef.current?.close()
    },
    type: 'image',
  })

  const handleRemoveImage = () => {
    groups.setGroupChat({ ...groups, image: undefined })
  }

  const hasErrorImage = false // TODO: implement error state for image

  return (
    <View style={styles.container}>
      <View style={styles.avatarOuterContainer}>
        {groups.image ? (
          <Image
            source={{ uri: groups.image }}
            style={[styles.selectedImage, hasErrorImage ? styles.errorBorder : {}]}
          />
        ) : (
          <View style={styles.avatarContainer}>
            <PictureIcon />
          </View>
        )}
      </View>
      <View>
        <Button mode="outlined" color="inherit" onPress={handlePresentModalPress}>
          {groups.image ? 'Change Avatar' : 'Upload Avatar'}
        </Button>
        {groups.image && (
          <Button mode="text" color="error" onPress={() => handleRemoveImage()}>
            Remove
          </Button>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          maxLength={30}
          mode="outlined"
          contentStyle={styles.input}
          label="Group Name"
          placeholder="Group Name"
          onChangeText={(text) => groups.setGroupChat({ ...groups, title: text })}
          value={groups.title}
        />
      </View>
      <BottomDrawer
        bottomDrawerRef={bottomDrawerRef}
        handleSheetChanges={handleSheetChanges}
        type="image"
        handleViewPhotoLibrary={handleViewPhotoLibrary}
        handleTakePhoto={handleTakePhoto}
        handleRemoveImage={handleRemoveImage}
      />
    </View>
  )
}

export default GroupChatDetails
