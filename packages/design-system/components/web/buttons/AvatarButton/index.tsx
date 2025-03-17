'use client'

import { FC } from 'react'

import { Typography } from '@mui/material'

import { AvatarWithPlaceholder } from '../../avatars'
import { AddMemberIcon as DefaultAddMemberIcon } from '../../icons'
import { AvatarButtonContainer } from './styled'
import { AvatarButtonProps } from './types'

const AvatarButton: FC<AvatarButtonProps> = ({
  onClick,
  Icon = DefaultAddMemberIcon,
  IconProps = {},
  caption,
}) => (
  <AvatarButtonContainer onClick={onClick}>
    <AvatarWithPlaceholder
      width={48}
      height={48}
      sx={{
        bgcolor: 'primary.main',
        alignSelf: 'flex-start',
        justifySelf: 'center',
      }}
    >
      <Icon {...IconProps} />
    </AvatarWithPlaceholder>
    {caption && (
      <Typography component="span" variant="subtitle2" sx={{ alignSelf: 'center' }}>
        {caption}
      </Typography>
    )}
  </AvatarButtonContainer>
)
export default AvatarButton
