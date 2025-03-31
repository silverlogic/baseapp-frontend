import { useNotification } from '@baseapp-frontend/utils'

import * as ImagePicker from 'expo-image-picker'

import { ViewPhotoLibraryProps } from './types'

const useViewPhotoLibrary = ({
  allowsEditing = false,
  isBase64 = false,
  onResult,
  onFinally,
  type,
}: ViewPhotoLibraryProps) => {
  const { sendToast } = useNotification()
  const aspectRatio = type === 'square' || type === 'image' ? ([1, 1] as const) : ([16, 9] as const)

  const handleImageSelection = async (result: ImagePicker.ImagePickerResult) => {
    if (!result.canceled) {
      const loadedImage = result.assets[0]
      try {
        onResult(loadedImage)
      } catch (error) {
        sendToast('Error reading image', { type: 'error' })
      } finally {
        onFinally?.()
      }
    }
  }

  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync()
    if (permissionResult.granted === false) {
      sendToast('Permission to access camera is required!', { type: 'error' })
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
      sendToast('Permission to access photo library is required!', { type: 'error' })
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
