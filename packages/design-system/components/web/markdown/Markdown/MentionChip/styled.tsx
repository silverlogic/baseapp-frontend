import MuiLink from '@mui/material/Link'
import { styled } from '@mui/material/styles'

export const StyledMentionLink = styled(MuiLink)(({ theme }) => ({
  cursor: 'pointer',
  pointerEvents: 'auto',
  // `&&` outranks the surrounding Markdown `& a` rule (and MUI's underline
  // variant). `theme.mention` is an opt-in override; unset keeps the defaults.
  '&&': {
    color: theme.palette.info.main,
    fontWeight: 500,
    ...theme.mention,
  },
})) as typeof MuiLink
