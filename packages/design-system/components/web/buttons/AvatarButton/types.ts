import { FC } from 'react'

import { SvgIconProps } from '@mui/material'

export interface AvatarButtonProps {
  onClick: () => void
  Icon?: FC<SvgIconProps>
  IconProps?: Partial<SvgIconProps>
  caption?: string
}
