'use client'

import { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import {
  CheckMarkIcon,
  CloseIcon as DefaultCloseIcon,
} from '@baseapp-frontend/design-system/components/web/icons'

import { Typography } from '@mui/material'

import { HeaderContainer } from './styled'
import { HeaderProps } from './types'

const Header: FC<HeaderProps> = ({
  CloseIcon = DefaultCloseIcon,
  CreateIcon = CheckMarkIcon,
  isDisabled,
  onBackButtonClicked,
  onCreateButtonClicked,
  title = 'New Group',
  titleProps = {},
}) => (
  <HeaderContainer>
    <IconButton onClick={onBackButtonClicked} aria-label="cancel group creation">
      <CloseIcon sx={{ fontSize: '24px' }} />
    </IconButton>
    <Typography component="span" variant="subtitle2" sx={{ textAlign: 'center' }} {...titleProps}>
      {title}
    </Typography>
    <IconButton aria-label="Create group" disabled={isDisabled} onClick={onCreateButtonClicked}>
      <CreateIcon sx={{ fontSize: '24px' }} />
    </IconButton>
  </HeaderContainer>
)

export default Header
