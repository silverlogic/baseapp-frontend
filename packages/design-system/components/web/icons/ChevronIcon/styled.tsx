import { SvgIcon } from '@mui/material'
import { styled } from '@mui/material/styles'

export const RotatingSvgIcon = styled(SvgIcon, {
  shouldForwardProp: (prop) => prop !== 'rotation',
})<{ rotation: number }>(({ theme, rotation }) => ({
  color: theme.palette.grey[800],
  fontSize: 24,
  transform: `rotate(${rotation}deg)`,
  transition: 'all 0.25s linear',
}))
