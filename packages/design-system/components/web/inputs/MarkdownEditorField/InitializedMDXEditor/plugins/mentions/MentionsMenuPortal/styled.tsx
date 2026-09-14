import { Paper, Popper } from '@mui/material'
import { styled } from '@mui/material/styles'

import { MENTION_MENU_WIDTH } from '../constants'
import { MENTION_ROW_HEIGHT, MENTION_VISIBLE_ROWS } from './constants'

export const StyledPopper = styled(Popper)(({ theme }) => ({
  zIndex: theme.zIndex.modal + 1,
}))

export const StyledPaper = styled(Paper)(({ theme }) => ({
  width: MENTION_MENU_WIDTH,
  maxHeight: MENTION_ROW_HEIGHT * MENTION_VISIBLE_ROWS,
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: theme.shadows[8],
  display: 'flex',
  flexDirection: 'column',
}))
