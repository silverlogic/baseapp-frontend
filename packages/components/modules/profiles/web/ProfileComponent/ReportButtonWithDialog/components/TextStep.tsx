import { FC } from 'react'

import { Button, Divider, TextField, Typography } from '@mui/material'

import { STEPS } from '../constants'
import { TextStepProps } from '../types'

const TextStep: FC<TextStepProps> = ({ reportText, setReportText, setCurrentStep }) => (
  <>
    <Typography variant="h5">How would you describe the problem?</Typography>
    <Typography variant="body2">
      Use the text field below to explain what the problem you are reporting is.
    </Typography>
    <Divider />
    <TextField
      fullWidth
      multiline
      rows={4}
      value={reportText}
      onChange={(e) => setReportText(e.target.value)}
      placeholder="I find the post to be offensive..."
    />
    <Button onClick={() => setCurrentStep(STEPS.summary)} disabled={!reportText}>
      Confirm
    </Button>
  </>
)

export default TextStep
