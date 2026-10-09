'use client'

import { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import {
  CheckMarkIcon,
  CloseIcon as DefaultCloseIcon,
} from '@baseapp-frontend/design-system/components/web/icons'

import { Typography } from '@mui/material'
import { useIntl } from 'react-intl'

import { Container } from './styled'
import { HeaderProps } from './types'

const Header: FC<HeaderProps> = ({
  CloseIcon = DefaultCloseIcon,
  EditIcon = CheckMarkIcon,
  isEditButtonDisabled,
  isMutationInFlight,
  onCancellation,
  onSubmit,
  title,
  titleProps = {},
}) => {
  const intl = useIntl()

  return (
    <Container>
      <IconButton
        onClick={onCancellation}
        aria-label={intl.formatMessage({
          id: 'messages.groupChatEdit.header.cancelAriaLabel',
          defaultMessage: 'cancel editing group',
        })}
      >
        <CloseIcon sx={{ fontSize: '24px' }} />
      </IconButton>
      <Typography component="span" variant="subtitle2" sx={{ textAlign: 'center' }} {...titleProps}>
        {title ??
          intl.formatMessage({
            id: 'messages.groupChatEdit.header.title',
            defaultMessage: 'Edit Group',
          })}
      </Typography>
      <IconButton
        aria-label={intl.formatMessage({
          id: 'messages.groupChatEdit.header.submitAriaLabel',
          defaultMessage: 'Edit group',
        })}
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
}

export default Header
