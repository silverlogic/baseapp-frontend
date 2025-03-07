import { FC } from 'react'

import { Avatar } from 'react-native-paper'

import { ProfileIcon } from '../../icons'
import { AvatarWithPlaceholderProps } from './types'

const AvatarWithPlaceholder: FC<AvatarWithPlaceholderProps> = ({ size = 40, imgSource }) => {
  if (!imgSource) {
    return <Avatar.Icon size={size} icon={ProfileIcon} />
  }

  return <Avatar.Image size={size} source={{ uri: imgSource }} />
}

export default AvatarWithPlaceholder
