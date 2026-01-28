import { FC } from 'react'

import {  Theme } from '@mui/material'

import { SidebarMenuNavItemIconProps } from './types'

const SidebarMenuNavItemIcon: FC<SidebarMenuNavItemIconProps> = ({ Icon = null,sx, ...props }) => {
  if (!Icon) return null

  return (
      <Icon
        sx={{
          height: 24,
          width: 24,
          marginRight: (theme: Theme) => theme.spacing(2),
          color: (theme: Theme) => theme.palette.text.secondary,
          ...sx,
        }}
        {...props}
      />
  )
}

export default SidebarMenuNavItemIcon
