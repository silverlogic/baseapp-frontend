import MuiLink from '@mui/material/Link'
import { styled } from '@mui/material/styles'

export const StyledMentionLink = styled(MuiLink)(({ theme }) => ({
  color: theme.palette.info.main,
  fontWeight: 500,
  cursor: 'pointer',
  pointerEvents: 'auto',
})) as typeof MuiLink
