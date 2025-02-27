import { ImageSourcePropType } from 'react-native'

export type SizeStylesOptions = {
  width: number
  height: number
}

type FallbackMode = {
  fallbackMode: boolean
  imageSource?: never
}

type ImageSource = {
  imageSource: ImageSourcePropType
  fallbackMode?: never
}

export type ClickableAvatarProps = {
  width?: number
  height?: number
  onPress?: () => void
} & (FallbackMode | ImageSource)
