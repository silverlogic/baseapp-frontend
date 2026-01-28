import {  FC } from 'react'

import { SvgIconProps } from '@mui/material'

export interface SidebarMenuNavItemIconProps extends SvgIconProps {
  Icon?: FC<SvgIconProps>
}
