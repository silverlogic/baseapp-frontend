import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const ImageContainer = styled(Box)({
  display: 'inline-block',
  overflow: 'hidden',
  position: 'relative',
  verticalAlign: 'bottom',
  '& span.component-image-wrapper': {
    backgroundSize: 'cover !important',
    height: '100%',
    verticalAlign: 'bottom',
    width: '100%',
  },
})
