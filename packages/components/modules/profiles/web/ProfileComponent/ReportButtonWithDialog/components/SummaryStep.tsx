import { FC } from 'react'

import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'

import { Box, Button, Divider, Typography } from '@mui/material'

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
        You&apos;re about to submit a report
      </Typography>
      <Typography variant="body2" textAlign={smDown ? 'center' : 'left'}>
        Your report is anonymous. If someone is in immediate danger, call the local emergency
        services - don&apos;t wait.
      </Typography>
      <Divider sx={{ marginX: '-32px' }} />
      <Box display="flex" flexDirection="column" gap={1}>
        <Typography variant="body2">Why are you reporting this?</Typography>
        <Typography variant="caption" color="text.secondary">
          {reportType?.label}
        </Typography>
      </Box>
      {reportSubType && (
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="body2">What type of {reportType?.label}?</Typography>
          <Typography variant="caption" color="text.secondary">
            {reportSubType?.label}
          </Typography>
        </Box>
      )}
      <Box display="flex" flexDirection="column" gap={1}>
        <Typography variant="body2">About the problem</Typography>
        <Typography variant="caption" color="text.secondary">
          {reportText}
        </Typography>
      </Box>
      <Button disabled={isMutationInFlight} onClick={handleReport} sx={{ marginTop: 2 }}>
        Submit Report
      </Button>
    </Box>
  )
}

export default SummaryStep
