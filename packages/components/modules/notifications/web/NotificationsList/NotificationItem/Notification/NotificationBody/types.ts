import { FC } from 'react'

import { BoxProps } from '@mui/material'

export interface NotificationBodyProps {
  content: string | null | undefined
  BodyTypographyContainer?: FC<BoxProps>
}
