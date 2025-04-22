import { FC } from 'react'

import { Button, Typography } from '@mui/material'

import { ConfirmationStepProps } from '../types'

const ConfirmationStep: FC<ConfirmationStepProps> = ({ reportType, onClose }) => (
  <>
    <Typography variant="h5">Thanks for reporting {reportType?.label}</Typography>
    <Typography variant="body2">
      Your report is anonymous. If someone is in immediate danger, call the local emergency services
      - don&apos;t wait.
    </Typography>
    <Button onClick={onClose}>Close</Button>
  </>
)

export default ConfirmationStep
