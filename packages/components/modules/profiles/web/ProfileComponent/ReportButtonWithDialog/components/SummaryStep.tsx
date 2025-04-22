import { FC } from 'react'

import { Button, Divider, Typography } from '@mui/material'

import { SummaryStepProps } from '../types'

const SummaryStep: FC<SummaryStepProps> = ({
  reportType,
  reportSubType,
  reportText,
  isMutationInFlight,
  handleReport,
}) => (
  <>
    <Typography variant="h5">You&apos;re about to submit a report</Typography>
    <Typography variant="body2">
      Your report is anonymous. If someone is in immediate danger, call the local emergency services
      - don&apos;t wait.
    </Typography>
    <Divider />
    <Typography variant="body2">Why are you reporting this?</Typography>
    <Typography variant="caption">{reportType?.label}</Typography>
    {reportSubType && (
      <>
        <Typography variant="body2">What type of {reportType?.label}?</Typography>
        <Typography variant="caption">{reportSubType?.label}</Typography>
      </>
    )}
    <Typography variant="body2">About the problem</Typography>
    <Typography variant="caption">{reportText}</Typography>
    <Button disabled={isMutationInFlight} onClick={handleReport}>
      Submit Report
    </Button>
  </>
)

export default SummaryStep
