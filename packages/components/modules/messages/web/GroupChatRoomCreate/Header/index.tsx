'use client'

import { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { CheckMarkIcon, CloseIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Typography } from '@mui/material'

import { HeaderContainer } from './styled'
import { HeaderProps } from './types'

const Header: FC<HeaderProps> = ({ isDisabled, onCreateButtonClicked, onBackButtonClicked }) => (
  <HeaderContainer>
    <IconButton onClick={onBackButtonClicked} aria-label="cancel group creation">
      <CloseIcon sx={{ fontSize: '24px' }} />
    </IconButton>
    <Typography component="span" variant="subtitle2" sx={{ textAlign: 'center' }}>
      New Group
    </Typography>
    <IconButton aria-label="Create group" disabled={isDisabled} onClick={onCreateButtonClicked}>
      <CheckMarkIcon sx={{ fontSize: '24px' }} />
    </IconButton>
  </HeaderContainer>
)

export default Header
