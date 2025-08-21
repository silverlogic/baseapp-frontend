import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const SubscriptionCardWrapper = styled(Box)(({ smDown }: { smDown: boolean }) => ({
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: 2,
  padding: 2,
  gap: 2,
  width: '100%',
  minWidth: '300px',
  maxWidth: smDown ? '100%' : '300px',
  height: 'max-content',
  flex: '1 1 300px',
}))
