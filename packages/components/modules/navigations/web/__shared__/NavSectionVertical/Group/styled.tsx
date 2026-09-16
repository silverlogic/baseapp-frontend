import ListSubheader from '@mui/material/ListSubheader'
import { styled } from '@mui/material/styles'

// key order mirrors the original sx: `typography: 'overline'` came after
// `fontSize: 11`, so the overline token's font size intentionally wins
export const GroupSubheader = styled(ListSubheader, {
  shouldForwardProp: (prop) => prop !== 'gap',
})<{ gap?: number }>(({ theme, gap = 4 }) => ({
  fontSize: 11,
  cursor: 'pointer',
  ...theme.typography.overline,
  display: 'inline-flex',
  color: theme.palette.text.disabled,
  marginBottom: `${gap}px`,
  padding: theme.spacing(2, 1, 1, 1.5),
  transition: theme.transitions.create(['color'], {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    color: theme.palette.text.primary,
  },
}))
