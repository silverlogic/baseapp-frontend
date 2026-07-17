import { styled } from '@mui/material/styles'

import { ActionOverlayTooltipContainer } from '../styled'

export const TooltipContainer = styled(ActionOverlayTooltipContainer)(({ theme }) => ({
  alignSelf: 'baseline',
  borderRadius: 500,
  margin: theme.spacing(0, 0.5),
  position: 'unset',
}))
