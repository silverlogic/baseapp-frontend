import { ChevronIconProps } from '@baseapp-frontend/design-system/components/web/icons'
import { IconButtonProps } from '@mui/material/IconButton'
import { FC } from 'react'

export interface NavToggleButtonProps extends IconButtonProps {
  ChevronIcon?: FC<ChevronIconProps>
  ChevronIconProps?: Partial<ChevronIconProps>
}
