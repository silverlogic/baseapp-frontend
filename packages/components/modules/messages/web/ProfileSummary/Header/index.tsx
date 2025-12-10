import { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { Iconify } from '@baseapp-frontend/design-system/components/web/images'

import { Typography } from '@mui/material'

import { ProfileSummaryHeaderContainer } from './styled'
import { HeaderProps } from './types'

const Header: FC<HeaderProps> = ({
  backIcon = 'eva:arrow-ios-back-fill',
  backIconProps = {},
  onBackButtonClicked,
}) => (
  <ProfileSummaryHeaderContainer>
    <IconButton
      aria-label="return to existing chat rooms"
      onClick={onBackButtonClicked}
      sx={{ maxWidth: 'fit-content' }}
    >
      <Iconify icon={backIcon} width={24} {...backIconProps} />
    </IconButton>
    <Typography component="span" variant="subtitle2" sx={{ textAlign: 'center' }}>
      Contact Details
    </Typography>
  </ProfileSummaryHeaderContainer>
)

export default Header
