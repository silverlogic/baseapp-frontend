import { FC } from 'react'

import { Avatar } from 'react-native-paper'
import { IconSource } from 'react-native-paper/lib/typescript/components/Icon'

import { ProfileIcon } from '../../icons'
import { AvatarWithPlaceholderProps } from './types'

const AvatarWithPlaceholder: FC<AvatarWithPlaceholderProps> = ({ size = 40, imgSource }) => {
  if (!imgSource) {
    return <Avatar.Icon size={size} icon={ProfileIcon as IconSource} />
  }

  return <Avatar.Image size={size} source={{ uri: imgSource }} />
}

export default AvatarWithPlaceholder
