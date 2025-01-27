import { BoxProps } from '@mui/material'

import { AvatarWithPlaceholderProps } from '../AvatarWithPlaceholder/types'

export interface AvatarContainerProps extends BoxProps {
  width: number
  height: number
  hasError?: boolean
}

export type CircledAvatarProps = AvatarContainerProps & AvatarWithPlaceholderProps
