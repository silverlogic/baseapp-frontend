'use client'

import { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import {
  CheckMarkIcon,
  CloseIcon as DefaultCloseIcon,
} from '@baseapp-frontend/design-system/components/web/icons'

import { Typography } from '@mui/material'
import { useIntl } from 'react-intl'

import { HEADER_MESSAGES } from './constants'
import { HeaderContainer } from './styled'
import { HeaderProps } from './types'

const Header: FC<HeaderProps> = ({
  CloseIcon = DefaultCloseIcon,
  CreateIcon = CheckMarkIcon,
  isDisabled,
  onBackButtonClicked,
  onCreateButtonClicked,
  title,
  titleProps = {},
}) => {
  const intl = useIntl()

  return (
    <HeaderContainer>
      <IconButton
        onClick={onBackButtonClicked}
        aria-label={intl.formatMessage(HEADER_MESSAGES.cancelAriaLabel)}
      >
        <CloseIcon sx={{ fontSize: '24px' }} />
      </IconButton>
      <Typography component="span" variant="subtitle2" sx={{ textAlign: 'center' }} {...titleProps}>
        {title ?? intl.formatMessage(HEADER_MESSAGES.title)}
      </Typography>
      <IconButton
        aria-label={intl.formatMessage(HEADER_MESSAGES.createAriaLabel)}
        disabled={isDisabled}
        onClick={onCreateButtonClicked}
      >
        <CreateIcon sx={{ fontSize: '24px' }} />
      </IconButton>
    </HeaderContainer>
  )
}

export default Header
