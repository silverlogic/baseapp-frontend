'use client'

import { StyledComponent } from '@emotion/styled'
import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

import { TypographyWithEllipsisProps } from './types'

const TypographyWithEllipsis: StyledComponent<TypographyWithEllipsisProps> = styled(
  (props) => <Typography maxWidth={300} {...props} />,
  {
    shouldForwardProp: (prop) => prop !== 'lineClamp',
  },
)<TypographyWithEllipsisProps>(({ lineClamp }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  ...(lineClamp && {
    '@supports (-webkit-line-clamp: 2)': {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'initial',
      display: '-webkit-box',
      WebkitLineClamp: lineClamp,
      WebkitBoxOrient: 'vertical',
    },
  }),
}))

export default TypographyWithEllipsis
