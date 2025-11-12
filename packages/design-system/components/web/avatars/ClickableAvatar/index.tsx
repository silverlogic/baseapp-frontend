'use client'

import { FC } from 'react'

import { m } from 'framer-motion'

import { varHover } from '../../animate/variants'
import { AvatarDeletedUserIcon } from '../../icons'
import AvatarWithPlaceholder from '../AvatarWithPlaceholder'
import { IconButtonStyled } from './styled'
import { ClickableAvatarProps } from './types'

const ClickableAvatar: FC<ClickableAvatarProps> = ({
  deletedUser = false,
  onClick,
  isOpen = false,
  width = 36,
  height = 36,
  children,
  ...props
}) => {
  if (deletedUser) {
    return (
      <AvatarWithPlaceholder width={width} height={height} {...props}>
        <AvatarDeletedUserIcon sx={{ fontSize: width }} titleAccess="Avatar Fallback" />
      </AvatarWithPlaceholder>
    )
  }

  return (
    <IconButtonStyled
      component={m.button}
      whileTap="tap"
      whileHover="hover"
      variants={varHover(1.05)}
      onClick={onClick}
      width={width}
      height={height}
      isOpen={isOpen}
    >
      <AvatarWithPlaceholder width={width} height={height} {...props}>
        {children}
      </AvatarWithPlaceholder>
    </IconButtonStyled>
  )
}

export default ClickableAvatar
