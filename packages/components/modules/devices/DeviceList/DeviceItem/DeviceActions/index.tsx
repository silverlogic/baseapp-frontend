import { FC } from 'react'

import { Button } from '@mui/material'

import { DeviceActionsContainer } from './styled'
import { DeviceActionsProps } from './types'
import { useLogoutDevice } from '../../../queries/useLogoutDevice'
import useNotification from '@baseapp-frontend/utils/hooks/useNotification'
import { useRelayEnvironment } from 'react-relay'

const DeviceActions: FC<DeviceActionsProps> = ({ device }) => {  
  const environment = useRelayEnvironment()
  const { sendApiErrorToast, sendToast } = useNotification()
  const {mutate: logoutDevice} = useLogoutDevice({
    onSuccess: () => {
      sendToast('Device signed out successfully')
      environment.commitUpdate(store => {
        store.delete(device.id)
      })
    },
    onError: (error) => sendApiErrorToast(error),
  })

  return (
    <DeviceActionsContainer>
        <Button variant="outlined" color="inherit" size="medium" sx={{ width: 'fit-content' }} onClick={() => logoutDevice({deviceId: device.deviceId})}>
          Sign Out
        </Button>
    </DeviceActionsContainer>
  )
}

export default DeviceActions
