import { Avatar, AvatarTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { styled } from '@mui/material/styles'

import { AvatarWithPlaceholderProps } from './types'

export const AvatarStyled = styled(Avatar)<AvatarWithPlaceholderProps>(
  ({ theme, width, height }) => ({
    width,
    height,
    border: `solid 2px ${theme.palette.background.default}`,
  }),
) as OverridableComponent<AvatarTypeMap<AvatarWithPlaceholderProps, 'div'>>
