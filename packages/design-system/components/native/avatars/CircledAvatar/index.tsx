import { FC } from 'react'

import { useTheme } from '../../../../providers/native'
import { View } from '../../views'
import AvatarWithPlaceholder from '../AvatarWithPlaceholder'
import { createStyles } from './styles'
import { CircledAvatarProps } from './types'

const CircledAvatar: FC<CircledAvatarProps> = ({ size = 40, imgSource }) => {
  const theme = useTheme()
  const styles = createStyles(theme, size)

  return (
    <View style={styles.container}>
      <AvatarWithPlaceholder size={size} imgSource={imgSource} />
    </View>
  )
}

export default CircledAvatar
