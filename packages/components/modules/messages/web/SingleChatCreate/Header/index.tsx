'use client'

import { FC } from 'react'

import { IconButton } from '@baseapp-frontend/design-system/components/web/buttons'
import { Iconify } from '@baseapp-frontend/design-system/components/web/images'

import { Box, Typography } from '@mui/material'

import { HeaderContainer } from './styled'

const Header: FC<{ onHeaderClick: () => void }> = ({ onHeaderClick }) => (
  <HeaderContainer>
    <Box
      display="grid"
      width="100%"
      gridTemplateColumns="24px auto 24px"
      gap={1.5}
      alignItems="center"
    >
      <IconButton
        aria-label="return to existing chat rooms"
        onClick={onHeaderClick}
        sx={{ maxWidth: 'fit-content' }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={24} />
      </IconButton>
      <Typography component="span" variant="subtitle2" sx={{ textAlign: 'center' }}>
        New Chat
      </Typography>
      <div />
    </Box>
  </HeaderContainer>
)

export default Header
