import { Box, Chip } from '@mui/material'
import { styled } from '@mui/material/styles'

export const DrawerImageContainer = styled('img')(() => ({
  width: '100%',
  height: 'auto',
  objectFit: 'contain',
}))
export const DrawerDescriptionContainer = styled(Box)(() => ({
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
}))

export const PackageContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

export const StyledChip = styled(Chip)(() => ({
  height: 24,
  fontSize: 13,
}))
