import { styled } from '@mui/material/styles'

export const MessageRow = styled('div', {
  shouldForwardProp: (prop) => prop !== 'alignment',
})<{ alignment: 'flex-end' | 'flex-start' }>(({ alignment }) => ({
  alignSelf: alignment,
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
}))

export const MessageColumn = styled('div', {
  shouldForwardProp: (prop) => prop !== 'alignment' && prop !== 'grouped',
})<{ alignment: 'flex-end' | 'flex-start'; grouped?: boolean }>(
  ({ theme, alignment, grouped }) => ({
    alignItems: alignment,
    alignSelf: alignment,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: grouped ? 0 : theme.spacing(5.5),
    width: '100%',
  }),
)
