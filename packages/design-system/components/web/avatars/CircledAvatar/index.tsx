'use client'

import { FC } from 'react'

import AvatarWithPlaceholder from '../AvatarWithPlaceholder'
import { AvatarContainer } from './styled'
import { CircledAvatarProps } from './types'

const CircledAvatar: FC<CircledAvatarProps> = ({
  width = 40,
  height = 40,
  hasError,
  children,
  ...props
}) => (
  <AvatarContainer width={width} height={height} hasError={hasError}>
    <AvatarWithPlaceholder
      width={width}
      height={height}
      sx={({ palette }) => ({ border: `solid 8px ${palette.background.default}` })}
      {...props}
    >
      {children}
    </AvatarWithPlaceholder>
  </AvatarContainer>
)

export default CircledAvatar
