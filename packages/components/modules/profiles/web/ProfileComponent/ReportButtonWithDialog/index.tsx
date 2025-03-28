'use client'

import { FC, useMemo, useState } from 'react'

import { Dialog } from '@baseapp-frontend/design-system/components/web/dialogs'
import {
  ChevronIcon,
  FlagIcon,
  OutlinedCheckMarkIcon,
} from '@baseapp-frontend/design-system/components/web/icons'

import { Box, Button, Divider, MenuItem, TextField, Typography } from '@mui/material'
import { useLazyLoadQuery } from 'react-relay'

import { ReportTypeListQuery as ReportTypeListQueryType } from '../../../../../__generated__/ReportTypeListQuery.graphql'
import { useReportCreateMutation } from '../../../common/graphql/mutations/ReportCreate'
import { ReportTypeListQuery } from '../../../common/graphql/queries/ReportTypeList'
import { TypeButton } from './styled'
import { ReportButtonWithDialogProps } from './types'

type AllReportTypes = NonNullable<ReportTypeListQueryType['response']['allReportTypes']>
type ReportType = NonNullable<AllReportTypes['edges'][number]>
type ReportTypeNode = NonNullable<ReportType['node']>
type ReportTypeSubType = NonNullable<ReportTypeNode['subTypes']['edges'][number]>
type ReportTypeSubTypeNode = ReportTypeSubType['node']

const ReportButtonWithDialog: FC<ReportButtonWithDialogProps> = ({ targetId, handleClose }) => {
  const { allReportTypes } = useLazyLoadQuery<ReportTypeListQueryType>(ReportTypeListQuery, {
    topLevelOnly: true,
    targetObjectId: targetId,
  })
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState('report')
  const [reportType, setReportType] = useState<ReportTypeNode>()
  const [reportSubType, setReportSubType] = useState<ReportTypeSubTypeNode>()
  const [reportText, setReportText] = useState('')

  const [commitMutation, isMutationInFlight] = useReportCreateMutation()
  const reportTypes = useMemo(
    () => allReportTypes?.edges?.filter((edge) => edge?.node).map((edge) => edge?.node) || [],
    [allReportTypes?.edges],
  ).sort((a, b) => {
    if (!a) return -1
    if (!b) return 1
    return a.name > b.name ? 1 : -1
  })
  const subTypes = useMemo(
    () => reportType?.subTypes?.edges?.filter((edge) => edge?.node).map((edge) => edge?.node) || [],
    [reportType?.subTypes?.edges],
  )

  const onClose = () => {
    handleClose()
    setCurrentStep('report')
  }

  const handleReport = () => {
    if (isMutationInFlight || !targetId) {
      return
    }
    commitMutation({
      variables: {
        input: {
          reportSubject: reportText,
          reportTypeId: reportType?.id,
          targetObjectId: targetId,
        },
      },
      onCompleted: (_, errors) => {
        if (!errors) {
          setCurrentStep('confirmation')
          return
        }
        onClose()
      },
      onError: () => {
        onClose()
      },
    })
  }

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
            {reportTypes?.map((type) => (
              <TypeButton
                key={type?.id}
                onClick={() => {
                  if (type?.subTypes?.edges?.length) {
                    setReportType(type)
                    setCurrentStep('subTypes')
                    return
                  }
                  if (type) {
                    setReportType(type)
                    setCurrentStep('reportText')
                  }
                }}
                endIcon={<ChevronIcon position="right" />}
              >
                <Typography variant="body2">{type?.label}</Typography>
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
            {subTypes?.map((subType) => (
              <TypeButton
                key={subType?.name}
                onClick={() => {
                  setReportSubType(subType)
                  setCurrentStep('reportText')
                }}
                endIcon={<ChevronIcon position="right" />}
              >
                <Typography variant="body2">{subType?.label}</Typography>
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
          {currentStep === 'confirmation' ? (
            <Box display="flex" alignItems="center" gap={2}>
              <OutlinedCheckMarkIcon sx={{ color: 'success.main', width: 35, height: 35 }} />
              <Typography variant="subtitle1">Report</Typography>
            </Box>
          ) : (
            <Typography variant="subtitle1">Report</Typography>
          )}
          {steps?.find((step) => step.name === currentStep)?.content}
        </Box>
      </Dialog>
    </>
  )
}

export default ReportButtonWithDialog
