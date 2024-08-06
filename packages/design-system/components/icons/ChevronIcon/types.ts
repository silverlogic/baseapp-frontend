import { SvgIconProps } from '@mui/material'

import { POSITION_DEGREE } from './constants'

export interface ChevronIconProps extends SvgIconProps {
  position?: keyof typeof POSITION_DEGREE
  isOpen?: boolean
}
