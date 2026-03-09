import { FC } from 'react'

import { ChevronIconProps } from '@baseapp-frontend/design-system/components/web/icons'

import { IconButtonProps } from '@mui/material/IconButton'

export interface NavToggleButtonProps extends IconButtonProps {
  ChevronIcon?: FC<ChevronIconProps>
  ChevronIconProps?: Partial<ChevronIconProps>
}
