import { FC } from 'react'

import { type ImageStyle, Image as NativeImage } from 'react-native'

import { useColorMode } from '../../../../hooks/native'
import { ImageProps } from './types'

const Image: FC<ImageProps> = ({
  source,
  darkSource,
  lightSource,
  width,
  height,
  style,
  ...props
}) => {
  const mode = useColorMode()

  const dimensionsStyles: ImageStyle = width && height ? { width, height } : {}

  if (lightSource && darkSource) {
    return (
      <NativeImage
        source={mode === 'dark' ? darkSource : lightSource}
        style={[dimensionsStyles, style]}
        {...props}
      />
    )
  }

  return <NativeImage source={source} style={[dimensionsStyles, style]} {...props} />
}

export default Image
