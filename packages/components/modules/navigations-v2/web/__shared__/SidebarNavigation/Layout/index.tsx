import { FC } from 'react'

import { Box } from '@mui/material'

import { LayoutProps } from './types'

const Layout: FC<LayoutProps> = ({ children, ...props }) => (
  <Box
    sx={{
      minHeight: 1,
      display: 'flex',
      flexDirection: { xs: 'column', lg: 'row' },
    }}
    {...props}
  >
    {children}
  </Box>
)

export default Layout
