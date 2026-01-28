import { IconButtonProps } from '@mui/material/IconButton'
import { SvgIconProps } from '@mui/material/SvgIcon'
import { FC } from 'react'

export interface ToggleButtonProps extends IconButtonProps {
  onClick?: VoidFunction
  Icon?: FC<SvgIconProps>
  iconProps?: Partial<SvgIconProps>
}
