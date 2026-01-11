import { IconButtonProps } from '@mui/material/IconButton'
import { SvgIconProps } from '@mui/material/SvgIcon'

export interface ToggleButtonProps extends IconButtonProps {
  onClick?: VoidFunction
  icon?: React.ReactNode
  iconProps?: Partial<SvgIconProps>
}
