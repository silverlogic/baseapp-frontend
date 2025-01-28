import { FC } from 'react'

import { Button } from '@mui/material'

import { DeviceActionsContainer } from './styled'
import { DeviceActionsProps } from './types'

const DeviceActions: FC<DeviceActionsProps> = ({ device }) => {
  return (
    <DeviceActionsContainer>
        <Button variant="outlined" color="inherit" size="medium" sx={{ width: 'fit-content' }}>
          Sign Out
        </Button>
    </DeviceActionsContainer>
  )
}

export default DeviceActions
