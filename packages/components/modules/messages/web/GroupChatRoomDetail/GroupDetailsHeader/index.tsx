import { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { PenEditIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { Iconify } from '@baseapp-frontend/design-system/components/web/images'

import { Typography } from '@mui/material'

import { GroupDetailsHeaderContainer } from './styled'
import { GroupDetailsHeaderProps } from './types'

export const GroupDetailsHeader: FC<GroupDetailsHeaderProps> = ({
  onBackButtonClicked,
  onEditButtonClicked,
  shouldDisplayEditButton,
}) => (
  <GroupDetailsHeaderContainer>
    <IconButton
      aria-label="return to existing chat rooms"
      onClick={onBackButtonClicked}
      sx={{ maxWidth: 'fit-content' }}
    >
      <Iconify icon="eva:arrow-ios-back-fill" width={24} />
    </IconButton>
    <Typography component="span" variant="subtitle2" sx={{ textAlign: 'center' }}>
      Group View
    </Typography>
    {shouldDisplayEditButton && (
      <IconButton
        aria-label="edit group chat"
        onClick={onEditButtonClicked}
        sx={{ maxWidth: 'fit-content' }}
      >
        <PenEditIcon sx={{ fontSize: '24px' }} />
      </IconButton>
    )}
  </GroupDetailsHeaderContainer>
)
