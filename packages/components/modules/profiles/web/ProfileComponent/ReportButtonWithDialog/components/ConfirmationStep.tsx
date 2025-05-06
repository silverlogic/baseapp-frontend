import { FC } from 'react'

import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'

import { Button, Typography } from '@mui/material'

import { ConfirmationStepProps } from '../types'

const ConfirmationStep: FC<ConfirmationStepProps> = ({ reportType, onClose }) => {
  const smDown = useResponsive('down', 'sm')

  return (
    <>
      <Typography variant="h5" textAlign={smDown ? 'center' : 'left'}>
        Thanks for reporting {reportType?.label}
      </Typography>
      <Typography variant="body2" textAlign={smDown ? 'center' : 'left'}>
        Your report is anonymous. If someone is in immediate danger, call the local emergency
        services - don&apos;t wait.
      </Typography>
      <Button onClick={onClose}>Close</Button>
    </>
  )
}

export default ConfirmationStep
