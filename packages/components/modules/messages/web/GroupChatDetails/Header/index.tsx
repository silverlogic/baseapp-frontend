import { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { PenEditIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { Iconify } from '@baseapp-frontend/design-system/components/web/images'

import { Typography } from '@mui/material'
import { useIntl } from 'react-intl'

import { SHARED_MESSAGES } from '../../__shared__/constants'
import { GroupDetailsHeaderContainer } from './styled'
import { HeaderProps } from './types'

const Header: FC<HeaderProps> = ({
  backIcon = 'eva:arrow-ios-back-fill',
  backIconProps = {},
  EditIcon = PenEditIcon,
  onBackButtonClicked,
  onEditButtonClicked,
  shouldDisplayEditButton,
}) => {
  const intl = useIntl()

  return (
    <GroupDetailsHeaderContainer>
      <IconButton
        aria-label={intl.formatMessage(SHARED_MESSAGES.returnToChatRooms)}
        onClick={onBackButtonClicked}
        sx={{ maxWidth: 'fit-content' }}
      >
        <Iconify icon={backIcon} width={24} {...backIconProps} />
      </IconButton>
      <Typography component="span" variant="subtitle2" sx={{ textAlign: 'center' }}>
        {intl.formatMessage({
          id: 'messages.groupChatDetails.header.title',
          defaultMessage: 'Group View',
        })}
      </Typography>
      {shouldDisplayEditButton && (
        <IconButton
          aria-label={intl.formatMessage({
            id: 'messages.groupChatDetails.header.editAriaLabel',
            defaultMessage: 'edit group chat',
          })}
          onClick={onEditButtonClicked}
          sx={{ maxWidth: 'fit-content' }}
        >
          <EditIcon sx={{ fontSize: '24px' }} />
        </IconButton>
      )}
    </GroupDetailsHeaderContainer>
  )
}

export default Header
