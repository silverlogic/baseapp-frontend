'use client'

import { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import {
  CheckMarkIcon,
  CloseIcon as DefaultCloseIcon,
} from '@baseapp-frontend/design-system/components/web/icons'

import { Typography } from '@mui/material'

import { Container } from './styled'
import { HeaderProps } from './types'

const Header: FC<HeaderProps> = ({
  CloseIcon = DefaultCloseIcon,
  EditIcon = CheckMarkIcon,
  isEditButtonDisabled,
  isMutationInFlight,
  onCancellation,
  onSubmit,
  title = 'Edit Group',
  titleProps = {},
}) => (
  <Container>
    <IconButton onClick={onCancellation} aria-label="cancel editing group">
      <CloseIcon sx={{ fontSize: '24px' }} />
    </IconButton>
    <Typography component="span" variant="subtitle2" sx={{ textAlign: 'center' }} {...titleProps}>
      {title}
    </Typography>
    <IconButton
      aria-label="Edit group"
      disabled={isEditButtonDisabled}
      isLoading={isMutationInFlight}
      onClick={() => {
        onSubmit()
      }}
    >
      <EditIcon sx={{ fontSize: '24px' }} />
    </IconButton>
  </Container>
)

export default Header
