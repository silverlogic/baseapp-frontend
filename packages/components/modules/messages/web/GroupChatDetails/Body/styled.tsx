import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const GroupHeaderContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: '144px auto',
  justifyItems: 'center',
  width: '100%',
  padding: theme.spacing(3.5),
  gap: theme.spacing(2),
}))

export const GroupTitleContainer = styled(Box)(() => ({
  width: '100%',
  textAlign: 'center',
  display: 'grid',
  gridTemplateRows: '22px 22px',
  gap: '4px',
}))

export const MembersContainer = styled(Box)(() => ({
  height: '100%',
  width: '100%',
  '@media (max-height: 600px) and (orientation: landscape)': {
    height: '50vh',
  },
}))
