import { FC, PropsWithChildren } from 'react'

import { Scrollbar } from '@baseapp-frontend/design-system/components/web/scrollbars'

import { Box } from '@mui/material'

const SidebarMenuContentSlot: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {children}
    </Scrollbar>
  )
}

export default SidebarMenuContentSlot
