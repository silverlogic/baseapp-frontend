import { FC, useCallback, useEffect, useRef } from 'react'

import { Button } from '@baseapp-frontend/design-system/components/native/buttons'
import { PictureIcon } from '@baseapp-frontend/design-system/components/native/icons'
import { TextInput } from '@baseapp-frontend/design-system/components/native/inputs'
import { View } from '@baseapp-frontend/design-system/components/native/views'
import { useViewPhotoLibrary } from '@baseapp-frontend/design-system/hooks/native'
import { useTheme } from '@baseapp-frontend/design-system/providers/native'

import { BottomSheetModal } from '@gorhom/bottom-sheet'
import * as ImagePicker from 'expo-image-picker'
import { Image, Platform } from 'react-native'
import { useLazyLoadQuery } from 'react-relay'

import { GroupDetailsQuery as GroupDetailsQueryType } from '../../../../__generated__/GroupDetailsQuery.graphql'
import BottomDrawer from '../../../profiles/native/ProfileSettingsComponent/BottomDrawer'
import { useTitleAndImage } from '../../common'
import { useGroupChatCreate } from '../../common/context/GroupChatProvider'
import { GroupDetailsQuery } from '../../common/graphql/queries/GroupDetailsQuery'
import { createStyles } from './styles'
import { EditGroupChatDetailsProps } from './types'

const EditGroupChatDetails: FC<EditGroupChatDetailsProps> = ({ roomId }) => {
  const { chatRoom: group } = useLazyLoadQuery<GroupDetailsQueryType>(
    GroupDetailsQuery,
    { roomId },
    {
      fetchPolicy: 'store-and-network',
      fetchKey: roomId,
    },
  )
  const { image: existingImage, title: existingTitle } = useTitleAndImage(group)
  const theme = useTheme()
  const styles = createStyles(theme)
  const bottomDrawerRef = useRef<BottomSheetModal | undefined>(undefined)

  const groups = useGroupChatCreate()

  useEffect(() => () => groups.resetGroupChat(), [])

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
      if (image?.uri) {
        groups.setGroupChat({ ...groups, image: image.uri })
      }
    },
    onFinally: () => {
      bottomDrawerRef.current?.close()
    },
    type: 'image',
  })

  const handleRemoveImage = () => {
    if (existingImage && groups.image === undefined) {
      groups.setGroupChat({ ...groups, image: '' })
      return
    }
    groups.setGroupChat({ ...groups, image: undefined })
  }

  return (
    <View style={styles.container}>
      <View style={styles.avatarOuterContainer}>
        {groups.image || (existingImage && groups.image !== '') ? (
          <Image source={{ uri: groups.image || existingImage }} style={[styles.selectedImage]} />
        ) : (
          <View style={styles.avatarContainer}>
            <PictureIcon />
          </View>
        )}
      </View>
      <View>
        <Button mode="outlined" color="inherit" onPress={handlePresentModalPress}>
          {groups.image || existingImage ? 'Change Avatar' : 'Upload Avatar'}
        </Button>
        {(groups.image || existingImage) && (
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
          value={groups.title ? groups.title : (existingTitle ?? '')}
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

export default EditGroupChatDetails
