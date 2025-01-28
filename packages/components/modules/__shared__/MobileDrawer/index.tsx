import { FC } from 'react'

import { Box, Divider, Drawer, Typography, styled } from '@mui/material'

import { MobileDrawerProps } from '../types'

const Puller = styled('div')(({ theme }) => ({
  width: 64,
  height: 6,
  backgroundColor: theme.palette.grey[500],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 32px)',
}))

const MobileDrawer: FC<MobileDrawerProps> = ({
  open,
  onClose,
  title = 'Drawer Title',
  children,
}) => (
  <Drawer
    anchor="bottom"
    open={open}
    onClose={onClose}
    PaperProps={{
      sx: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      },
    }}
  >
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        padding: 2,
        boxSizing: 'border-box',
      }}
    >
      <Puller />
      <Typography variant="subtitle1" m={4} align="center">
        {title}
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      {children}
    </Box>
  </Drawer>
)

export default MobileDrawer
