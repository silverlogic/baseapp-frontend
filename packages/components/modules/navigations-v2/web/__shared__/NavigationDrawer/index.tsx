import { FC } from 'react'

import { Drawer } from '@mui/material'

import { NAV_WIDTH } from '../../constants'
import { NavigationDrawerProps } from './types'

const NavigationDrawer: FC<NavigationDrawerProps> = ({ children, PaperProps, ...props }) => (
  <Drawer
    PaperProps={{
      sx: {
        width: NAV_WIDTH.VERTICAL,
        height: '100% !important',
        paddingX: 2,
      },
      ...PaperProps,
    }}
    {...props}
  >
    {children}
  </Drawer>
)

export default NavigationDrawer
