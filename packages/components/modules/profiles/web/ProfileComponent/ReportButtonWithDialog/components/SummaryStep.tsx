import { FC } from 'react'

import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'

import { Box, Button, Divider, Typography } from '@mui/material'
import { FormattedMessage } from 'react-intl'

import { REPORT_MESSAGES } from '../constants'
import { SummaryStepProps } from '../types'

const SummaryStep: FC<SummaryStepProps> = ({
  reportType,
  reportSubType,
  reportText,
  isMutationInFlight,
  handleReport,
}) => {
  const smDown = useResponsive('down', 'sm')

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="h5" textAlign={smDown ? 'center' : 'left'}>
        <FormattedMessage
          id="profiles.report.summary.title"
          defaultMessage="You're about to submit a report"
        />
      </Typography>
      <Typography variant="body2" textAlign={smDown ? 'center' : 'left'}>
        <FormattedMessage {...REPORT_MESSAGES.anonymousNotice} />
      </Typography>
      <Divider sx={{ marginX: '-32px' }} />
      <Box display="flex" flexDirection="column" gap={1}>
        <Typography variant="body2">
          <FormattedMessage {...REPORT_MESSAGES.whyReporting} />
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {reportType?.label}
        </Typography>
      </Box>
      {reportSubType && (
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="body2">
            <FormattedMessage
              id="profiles.report.summary.subTypeQuestion"
              defaultMessage="What type of {reportType}?"
              values={{ reportType: reportType?.label }}
            />
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {reportSubType?.label}
          </Typography>
        </Box>
      )}
      <Box display="flex" flexDirection="column" gap={1}>
        <Typography variant="body2">
          <FormattedMessage
            id="profiles.report.summary.aboutProblem"
            defaultMessage="About the problem"
          />
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {reportText}
        </Typography>
      </Box>
      <Button disabled={isMutationInFlight} onClick={handleReport} sx={{ marginTop: 2 }}>
        <FormattedMessage id="profiles.report.summary.submit" defaultMessage="Submit Report" />
      </Button>
    </Box>
  )
}

export default SummaryStep
