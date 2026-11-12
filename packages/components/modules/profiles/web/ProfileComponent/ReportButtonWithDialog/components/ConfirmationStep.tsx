import { FC } from 'react'

import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'

import { Button, Typography } from '@mui/material'
import { FormattedMessage } from 'react-intl'

import { REPORT_MESSAGES } from '../constants'
import { ConfirmationStepProps } from '../types'

const ConfirmationStep: FC<ConfirmationStepProps> = ({ reportType, onClose }) => {
  const smDown = useResponsive('down', 'sm')

  return (
    <>
      <Typography variant="h5" textAlign={smDown ? 'center' : 'left'}>
        <FormattedMessage
          id="profiles.report.confirmation.title"
          defaultMessage="Thanks for reporting {reportType}"
          values={{ reportType: reportType?.label }}
        />
      </Typography>
      <Typography variant="body2" textAlign={smDown ? 'center' : 'left'}>
        <FormattedMessage {...REPORT_MESSAGES.anonymousNotice} />
      </Typography>
      <Button onClick={onClose}>
        <FormattedMessage id="common.close" defaultMessage="Close" />
      </Button>
    </>
  )
}

export default ConfirmationStep
