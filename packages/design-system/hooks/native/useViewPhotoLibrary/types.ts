import * as ImagePicker from 'expo-image-picker'

export interface ViewPhotoLibraryProps {
  onResult: (
    image?: ImagePicker.ImagePickerAsset,
    type?: 'default' | 'square' | 'image' | 'bannerImage',
  ) => void
  onFinally?: () => void
  allowsEditing: boolean
  isBase64: boolean
  type: 'default' | 'square' | 'image' | 'bannerImage'
}
