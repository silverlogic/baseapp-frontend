import { FC, useState } from 'react'

import { Button } from '@mui/material'

import { DeviceActionsContainer } from './styled'
import { DeviceActionsProps } from './types'
import { useLogoutDevice } from '../../../queries/useLogoutDevice'
import useNotification from '@baseapp-frontend/utils/hooks/useNotification'
import { useRelayEnvironment } from 'react-relay'
import ConfirmDialog from '@baseapp-frontend/design-system/components/dialogs/ConfirmDialog'

const DeviceActions: FC<DeviceActionsProps> = ({ device }) => {  
  const environment = useRelayEnvironment()
  const { sendApiErrorToast, sendToast } = useNotification()
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const {mutate: logoutDevice} = useLogoutDevice({
    onSuccess: () => {
      sendToast('You have successfully logged out from this device.')
      environment.commitUpdate(store => {
        store.delete(device.id)
      })
    },
    onError: (error) => sendApiErrorToast(error),
  })

  return (
    <>
      <ConfirmDialog 
        title="Are you sure you want to sign out from this device?" 
        content="Signing out will remove this device from your devices list and will require reauthentication the next time you sign in." 
        action={
          <Button variant="contained" color="inherit" size="medium" sx={{ width: 'fit-content' }} onClick={() => logoutDevice({deviceId: device.deviceId})}>
            Sign Out
          </Button>
        } 
        onClose={() => setShowConfirmDialog(false)} 
        open={showConfirmDialog}
      />
      <DeviceActionsContainer>
          <Button variant="outlined" color="inherit" size="medium" sx={{ width: 'fit-content' }} onClick={() => setShowConfirmDialog(true)}>
            Sign Out
          </Button>
      </DeviceActionsContainer>
    </>
  )
}

export default DeviceActions
