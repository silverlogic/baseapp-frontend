import { FC } from 'react'
import { Scrollbar } from '@baseapp-frontend/design-system/components/web/scrollbars'
import { SidebarMenuContentProps } from './types'
import { createNavRenderer } from '../../createNavRenderer'

const SidebarMenuContent: FC<SidebarMenuContentProps> = ({ children, slots, navData, sx, ...props }) => {
  return (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
        ...sx,
      }}
      {...props}
    >
      {navData?.map((nav, idx) => createNavRenderer(slots ?? {})(nav, idx))}
    </Scrollbar>
  )
}

export default SidebarMenuContent
