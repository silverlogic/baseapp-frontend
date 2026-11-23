import { useNotification } from '@baseapp-frontend/utils'

import * as ImagePicker from 'expo-image-picker'
import { useIntl } from 'react-intl'

import { ViewPhotoLibraryProps } from './types'

const useViewPhotoLibrary = ({
  allowsEditing = false,
  isBase64 = false,
  onResult,
  onFinally,
  type,
}: ViewPhotoLibraryProps) => {
  const intl = useIntl()
  const { sendToast } = useNotification()
  const aspectRatio = type === 'square' || type === 'image' ? ([1, 1] as const) : ([16, 9] as const)

  const handleImageSelection = async (result: ImagePicker.ImagePickerResult) => {
    if (!result.canceled) {
      const loadedImage = result.assets[0]
      try {
        onResult(loadedImage)
      } catch (error) {
        sendToast(
          intl.formatMessage({
            id: 'designSystem.photoLibrary.readError',
            defaultMessage: 'Error reading image',
          }),
          { type: 'error' },
        )
      } finally {
        onFinally?.()
      }
    }
  }

  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync()
    if (permissionResult.granted === false) {
      sendToast(
        intl.formatMessage({
          id: 'designSystem.photoLibrary.cameraPermission',
          defaultMessage: 'Permission to access camera is required!',
        }),
        { type: 'error' },
      )
      return
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing,
      aspect: [aspectRatio[0], aspectRatio[1]],
      quality: 1,
    })

    handleImageSelection(result)
  }

  const handleViewPhotoLibrary = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (permissionResult.granted === false) {
      sendToast(
        intl.formatMessage({
          id: 'designSystem.photoLibrary.libraryPermission',
          defaultMessage: 'Permission to access photo library is required!',
        }),
        { type: 'error' },
      )
      return
    }

    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      base64: isBase64,
      allowsEditing,
      aspect: [aspectRatio[0], aspectRatio[1]],
      quality: 1,
    })

    handleImageSelection(image)
  }

  return { handleViewPhotoLibrary, handleTakePhoto }
}

export default useViewPhotoLibrary
