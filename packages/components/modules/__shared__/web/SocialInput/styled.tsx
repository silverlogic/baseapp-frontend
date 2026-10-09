import { styled } from '@mui/material/styles'

export const Form = styled('form')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: 8,
  // Offsets the pinned position, not the flow position: while stuck, marginBottom has
  // no effect, so without this the composer sits flush against the viewport edge.
  bottom: theme.spacing(2),
  width: '100%',
  marginBottom: theme.spacing(2),
  position: 'sticky',
  zIndex: 10,
}))
