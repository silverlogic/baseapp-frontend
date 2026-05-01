import { ListItemButton } from '@mui/material'
import { styled } from '@mui/material/styles'

import { MENTION_ROW_HEIGHT } from '../constants'

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  height: MENTION_ROW_HEIGHT,
  gap: theme.spacing(1.5),
  paddingInline: theme.spacing(2),
  '&.Mui-selected': {
    backgroundColor: theme.palette.action.selected,
  },
  '& .MuiListItemText-primary': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}))
