import { PropsWithChildren } from 'react'

import { TypographyProps } from '@mui/material'

export interface BodyProps extends PropsWithChildren {
  avatar?: string
  avatarSize?: number
  participantsCount?: number
  participantsCountStyle?: TypographyProps
  title?: string | null
  titleProps?: TypographyProps
}
