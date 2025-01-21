import { FC } from 'react'

import { Button } from '@mui/material'

import { DeviceActionsContainer } from './styled'

const DeviceActions: FC = () => (
  <DeviceActionsContainer>
    <Button variant="outlined" color="inherit" size="medium" sx={{ width: 'fit-content' }}>
      Sign Out
    </Button>
  </DeviceActionsContainer>
)

export default DeviceActions
