import { FC } from 'react'

import { Collapse } from '@mui/material'

import { SidebarMenuNavGroupContentProps } from './types'

const SidebarMenuNavGroupContent: FC<SidebarMenuNavGroupContentProps> = ({
  open = true,
  children,
  ...props
}) => {
  return (
    <Collapse in={open} {...props}>
      {children}
    </Collapse>
  )
}

export default SidebarMenuNavGroupContent
