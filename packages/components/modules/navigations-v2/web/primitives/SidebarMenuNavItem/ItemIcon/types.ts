import { FC } from 'react'

import { SvgIconProps } from '@mui/material'

export interface ItemIconProps extends SvgIconProps {
  Icon?: FC<SvgIconProps>
}
