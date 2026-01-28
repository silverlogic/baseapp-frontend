import { FC } from 'react'

import { Box } from '@mui/material'

import { VerticalLayoutProps } from './types'

const VerticalLayout: FC<VerticalLayoutProps> = ({ children, ...props }) => {
  return (
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
}

export default VerticalLayout
