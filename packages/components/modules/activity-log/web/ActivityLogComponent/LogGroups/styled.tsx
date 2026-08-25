import { AvatarWithPlaceholder } from '@baseapp-frontend/design-system/components/web/avatars'

import { styled } from '@mui/material/styles'

export const ScrollContainer = styled('div')({
  overflowX: 'auto',
})

export const GroupAvatar = styled(AvatarWithPlaceholder)(({ theme }) => ({
  alignSelf: 'start',
  border: 'none',
  justifySelf: 'center',
  marginBottom: theme.spacing(0.5),
}))
