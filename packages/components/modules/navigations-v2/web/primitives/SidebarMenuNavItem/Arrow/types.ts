import { FC } from 'react'

import { SvgIconProps } from '@mui/material'

export interface ArrowProps extends SvgIconProps {
  Icon?: FC<SvgIconProps>
  isExpanded?: boolean
}
