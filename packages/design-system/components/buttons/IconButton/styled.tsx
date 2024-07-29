import { IconButton as MUIIconButton } from '@mui/material'
import { styled } from '@mui/material/styles'

import { IconButtonProps } from './types'

export const StyledIconButton = styled((props) => (
  <MUIIconButton disableRipple {...props} />
))<IconButtonProps>(({ hasTooltip, theme }) => ({
  '&.Mui-disabled': {
    cursor: 'not-allowed',
    pointerEvents: hasTooltip ? 'none' : 'unset',
    svg: {
      color: theme.palette.action.disabled,
    },
  },
  padding: 0,
}))
