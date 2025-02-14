'use client'

import { FC, useState } from 'react'

import { FlagIcon } from '@baseapp-frontend/design-system/components/common/icons'
import { Dialog } from '@baseapp-frontend/design-system/components/web/dialogs'
import { ChevronIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { useNotification } from '@baseapp-frontend/utils'

import { Box, Button, Divider, MenuItem, TextField, Typography } from '@mui/material'
import { graphql, useMutation } from 'react-relay'

import { ReportCreateMutation } from '../../../../../__generated__/ReportCreateMutation.graphql'
import { TypeButton } from './styled'
import { ReportButtonWithDialogProps, ReportType } from './types'

const mainTypes: ReportType[] = [
  {
    name: 'scam',
    label: 'Scam or fraud',
    subTypes: [],
  },
  {
    name: 'adultContent',
    label: 'Adult Content',
    subTypes: [
      {
        name: 'pornography',
        label: 'Pornography',
        subTypes: [],
      },
      {
        name: 'childAbuse',
        label: 'Child abuse',
        subTypes: [],
      },
      {
        name: 'prostituition',
        label: 'Prostituition',
        subTypes: [],
      },
    ],
  },
  {
    name: 'violence',
    label: 'Violence, hate or exploitation',
    subTypes: [],
  },
  {
    name: 'bulling',
    label: 'Bulling or unwanted contact',
    subTypes: [],
  },
  {
    name: 'other',
    label: 'Other',
    subTypes: [],
  },
]

const mutationQuery = graphql`
  mutation ReportMutation($input: ReportCreateInput!) {
    reportCreate(
      input: {
        reportSubject
        reportType
        targetObjectId
        }
    ) {
      report {
        node {
          id
          created
        }
      }
  }
}
`

const ReportButtonWithDialog: FC<ReportButtonWithDialogProps> = ({
  currentProfileId,
  handleClose,
}) => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState('report')
  const [reportType, setReportType] = useState<ReportType>()
  const [reportSubType, setReportSubType] = useState<ReportType>()
  const [reportText, setReportText] = useState('')

  const [commitMutation, isMutationInFlight] = useMutation<ReportCreateMutation>(mutationQuery)
  const { sendToast } = useNotification()

  const onClose = () => {
    handleClose()
    setCurrentStep('report')
  }

  const handleReport = () => {
    if (isMutationInFlight || !currentProfileId) {
      return
    }
    commitMutation({
      variables: {
        input: {
          reportSubject: reportText,
          reportType,
          targetObjectId: currentProfileId,
        },
      },
      onCompleted: (response, errors) => {
        errors?.forEach((error) => {
          sendToast(error.message, { type: 'error' })
        })
        onClose()
        setCurrentStep('confirmation')
      },
      onError: () => {
        // Show something when report fails (likely due to existing one)
        // Suggestion: setCurrentStep('error')
        // handleError?.()
      },
    })
  }

  // const handleReport = () => {
  //   console.log('Reported')
  //   console.log('reportType', reportType)
  //   console.log('reportSubType', reportSubType)
  //   console.log('reportText', reportText)
  //   console.log('currentProfileId', currentProfileId)
  //   setCurrentStep('confirmation')
  // }

  const steps = [
    {
      name: 'report',
      content: (
        <>
          <Box>
            <Typography variant="h5">Why are you reporting this?</Typography>
          </Box>
          <Box>
            <Typography variant="body2">
              Your report is anonymous. If someone is in immediate danger, call the local emergency
              services - don&apos;t wait.
            </Typography>
          </Box>
          <Divider />
          <Box display="flex" flexDirection="column">
            {mainTypes.map((type) => (
              <TypeButton
                key={type.name}
                onClick={() => {
                  if (type.subTypes.length) {
                    setReportType(type)
                    setCurrentStep('subTypes')
                    return
                  }
                  setReportType(type)
                  setCurrentStep('reportText')
                }}
                endIcon={<ChevronIcon position="right" />}
              >
                <Typography variant="body2">{type.label}</Typography>
              </TypeButton>
            ))}
          </Box>
        </>
      ),
    },
    {
      name: 'subTypes',
      content: (
        <>
          <Typography variant="h5">{reportType?.label}</Typography>
          <Divider />
          <Box display="flex" flexDirection="column">
            {reportType?.subTypes?.map((subType) => (
              <TypeButton
                key={subType.name}
                onClick={() => {
                  setReportSubType(subType)
                  setCurrentStep('reportText')
                }}
                endIcon={<ChevronIcon position="right" />}
              >
                <Typography variant="body2">{subType.label}</Typography>
              </TypeButton>
            ))}
          </Box>
        </>
      ),
    },
    {
      name: 'reportText',
      content: (
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
          <Button onClick={() => setCurrentStep('summary')}>Confirm</Button>
        </>
      ),
    },
    {
      name: 'summary',
      content: (
        <>
          <Typography variant="h5">You&apos;re about to submit a report</Typography>
          <Typography variant="body2">
            Your report is anonymous. If someone is in immediate danger, call the local emergency
            services - don&apos;t wait.
          </Typography>
          <Divider />
          <Typography variant="body2">Why are you reporting this?</Typography>
          <Typography variant="caption">{reportType?.label}</Typography>
          {reportType?.subTypes && reportType?.subTypes?.length > 0 && (
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
      ),
    },
    {
      name: 'confirmation',
      content: (
        <>
          <Typography variant="h5">Thanks for reporting {reportType?.label}</Typography>
          <Typography variant="body2">
            Your report is anonymous. If someone is in immediate danger, call the local emergency
            services - don&apos;t wait.
          </Typography>
          <Button onClick={onClose}>Close</Button>
        </>
      ),
    },
  ]

  return (
    <>
      <MenuItem onClick={() => setIsReportModalOpen(true)} disableRipple>
        <Typography variant="body2" color="error.main" noWrap>
          <FlagIcon sx={{ color: 'error.main', marginRight: '5px' }} />
          Report profile
        </Typography>
      </MenuItem>
      <Dialog open={isReportModalOpen} onClose={onClose}>
        <Box display="flex" flexDirection="column" padding={4} gap={2}>
          <Typography variant="subtitle1">
            {currentStep === 'confirmation' ? 'Check Report' : 'Report'}
          </Typography>
          {steps?.find((step) => step.name === currentStep)?.content}
        </Box>
      </Dialog>
    </>
  )
}

export default ReportButtonWithDialog
