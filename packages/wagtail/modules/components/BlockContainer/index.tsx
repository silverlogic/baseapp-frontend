import { FC, PropsWithChildren } from 'react'

import { Box, Container as MuiContainer } from '@mui/material'

import { usePageLayoutContext } from '../../providers'

const BlockContainer: FC<PropsWithChildren> = ({ children, ...props }) => {
  const { loadContainer } = usePageLayoutContext()

  if (!loadContainer) {
    return <Box {...props}>{children}</Box>
  }

  return <MuiContainer {...props}>{children}</MuiContainer>
}

export default BlockContainer
