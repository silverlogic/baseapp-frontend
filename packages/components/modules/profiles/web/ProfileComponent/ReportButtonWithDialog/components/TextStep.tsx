import { FC } from 'react'

import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'

import { Button, Divider, TextField, Typography } from '@mui/material'
import { FormattedMessage, useIntl } from 'react-intl'

import { STEPS } from '../constants'
import { TextStepProps } from '../types'

const TextStep: FC<TextStepProps> = ({ reportText, setReportText, setCurrentStep }) => {
  const smDown = useResponsive('down', 'sm')
  const intl = useIntl()

  return (
    <>
      <Typography variant="h5" textAlign={smDown ? 'center' : 'left'}>
        <FormattedMessage
          id="profiles.report.text.title"
          defaultMessage="How would you describe the problem?"
        />
      </Typography>
      <Typography variant="body2" textAlign={smDown ? 'center' : 'left'}>
        <FormattedMessage
          id="profiles.report.text.description"
          defaultMessage="Use the text field below to explain what the problem you are reporting is."
        />
      </Typography>
      <Divider sx={{ marginX: '-32px' }} />
      <TextField
        fullWidth
        multiline
        rows={4}
        value={reportText}
        onChange={(e) => setReportText(e.target.value)}
        placeholder={intl.formatMessage({
          id: 'profiles.report.text.placeholder',
          defaultMessage: 'I find the post to be offensive...',
        })}
      />
      <Button onClick={() => setCurrentStep(STEPS.summary)} disabled={!reportText}>
        <FormattedMessage id="common.confirm" defaultMessage="Confirm" />
      </Button>
    </>
  )
}

export default TextStep
