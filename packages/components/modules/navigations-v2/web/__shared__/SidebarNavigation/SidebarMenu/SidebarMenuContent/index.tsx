import { FC } from 'react'

import { Scrollbar } from '@baseapp-frontend/design-system/components/web/scrollbars'

import type { SidebarMenuContentProps } from './types'
import { createNavRenderer } from './utils'

const SidebarMenuContent: FC<SidebarMenuContentProps> = ({
  slots,
  slotProps,
  navData,
  sx,
  ...props
}) => {
  const renderNav = createNavRenderer(slots ?? {}, slotProps ?? {})
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
      {navData?.map((nav, idx) => renderNav(nav, idx))}
    </Scrollbar>
  )
}

export default SidebarMenuContent
