import { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { Iconify } from '@baseapp-frontend/design-system/components/web/images'

import { Typography } from '@mui/material'
import { useIntl } from 'react-intl'

import { SHARED_MESSAGES } from '../../__shared__/constants'
import { ProfileSummaryHeaderContainer } from './styled'
import { HeaderProps } from './types'

const Header: FC<HeaderProps> = ({
  backIcon = 'eva:arrow-ios-back-fill',
  backIconProps = {},
  onBackButtonClicked,
}) => {
  const intl = useIntl()

  return (
    <ProfileSummaryHeaderContainer>
      <IconButton
        aria-label={intl.formatMessage(SHARED_MESSAGES.returnToChatRooms)}
        onClick={onBackButtonClicked}
        sx={{ maxWidth: 'fit-content' }}
      >
        <Iconify icon={backIcon} width={24} {...backIconProps} />
      </IconButton>
      <Typography component="span" variant="subtitle2" sx={{ textAlign: 'center' }}>
        {intl.formatMessage(SHARED_MESSAGES.contactDetails)}
      </Typography>
    </ProfileSummaryHeaderContainer>
  )
}

export default Header
