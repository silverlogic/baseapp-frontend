import { FC } from 'react'

import { Pressable, View } from 'react-native'

import { useTheme } from '../../../../providers/native'
import { Image } from '../../images'
import { createStyles } from './styles'
import { ClickableAvatarProps } from './types'

const ClickableAvatar: FC<ClickableAvatarProps> = ({
  imageSource,
  onPress,
  height = 36,
  width = 36,
  fallbackMode = false,
}) => {
  const theme = useTheme()
  const styles = createStyles(theme, { width, height })

  if (fallbackMode) {
    return (
      <View style={styles.container}>
        <View style={styles.imageFallbackState} />
      </View>
    )
  }

  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Image source={imageSource} style={styles.image} />
      </View>
    </Pressable>
  )
}

export default ClickableAvatar
