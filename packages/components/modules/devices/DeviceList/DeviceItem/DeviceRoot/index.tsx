import { FC, PropsWithChildren } from 'react'

import { Box } from '@mui/material'

import { DeviceRootContainer } from './styled'

const DeviceRoot: FC<PropsWithChildren> = ({ children }) => (
  <Box paddingBottom={2}>
    <DeviceRootContainer>{children}</DeviceRootContainer>
  </Box>
)

export default DeviceRoot
