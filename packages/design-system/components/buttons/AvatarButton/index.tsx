'use client'

import { FC } from 'react'

import { Typography } from '@mui/material'
import Image from 'next/image'

import { AvatarWithPlaceholder } from '../../avatars'
import { AvatarButtonContainer } from './styled'
import { AvatarButtonProps } from './types'

/**
 * This is a IconButton component.
 *
 * @description
 * This is a **BaseApp** feature.
 *
 * Developers can freely edit this to suit the project's needs.
 *
 * If you believe your changes should be in the BaseApp, please read the **CONTRIBUTING.md** guide.
 */
const AvatarButton: FC<AvatarButtonProps> = ({
  onClick,
  imageString,
  caption,
  alt = 'Avatar Button',
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
      {imageString && <Image src={imageString} alt={alt} width={24} height={24} />}
    </AvatarWithPlaceholder>
    {caption && (
      <Typography component="span" variant="subtitle2" sx={{ alignSelf: 'center' }}>
        {caption}
      </Typography>
    )}
  </AvatarButtonContainer>
)
export default AvatarButton
