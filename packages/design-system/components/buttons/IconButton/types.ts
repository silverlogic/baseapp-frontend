import { IconButtonProps as MUIIconButtonProps } from '@mui/material'

export interface IconButtonProps extends MUIIconButtonProps {
  hasTooltip?: boolean
  isLoading?: boolean
}
