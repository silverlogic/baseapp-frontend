import { FC } from 'react'

import { Drawer } from '@mui/material'

import { NAV_WIDTH } from '../../constants'
import { NavigationDrawerProps } from './types'

const NavigationDrawer: FC<NavigationDrawerProps> = ({ children, PaperProps = {}, ...props }) => {
  const { sx: sxPaperProps, ...otherPaperProps } = PaperProps
  return (
    <Drawer
      PaperProps={{
        sx: {
          width: NAV_WIDTH.VERTICAL,
          height: '100% !important',
          paddingX: 2,
          ...sxPaperProps,
        },
        ...otherPaperProps,
      }}
      {...props}
    >
      {children}
    </Drawer>
  )
}

export default NavigationDrawer
