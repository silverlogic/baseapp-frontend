'use client'

import { FC, useMemo, useState } from 'react'

import { Dialog } from '@baseapp-frontend/design-system/components/web/dialogs'
import {
  FlagIcon,
  OutlinedCheckMarkIcon,
} from '@baseapp-frontend/design-system/components/web/icons'

import { Box, MenuItem, Typography } from '@mui/material'
import { useLazyLoadQuery } from 'react-relay'

import { ReportTypeListQuery as ReportTypeListQueryType } from '../../../../../__generated__/ReportTypeListQuery.graphql'
import { useReportCreateMutation } from '../../../common/graphql/mutations/ReportCreate'
import { ReportTypeListQuery } from '../../../common/graphql/queries/ReportTypeList'
import ConfirmationStep from './components/ConfirmationStep'
import SelectReportTypeStep from './components/SelectReportTypeStep'
import SummaryStep from './components/SummaryStep'
import TextStep from './components/TextStep'
import { STEPS } from './constants'
import { ReportButtonWithDialogProps, ReportTypeNode, ReportTypeSubTypeNode } from './types'

const ReportButtonWithDialog: FC<ReportButtonWithDialogProps> = ({ targetId, handleClose }) => {
  const { allReportTypes } = useLazyLoadQuery<ReportTypeListQueryType>(ReportTypeListQuery, {
    topLevelOnly: true,
    targetObjectId: targetId,
  })
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(STEPS.report)
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
    return a.key > b.key ? 1 : -1
  })
  const subTypes = useMemo(
    () => reportType?.subTypes?.edges?.filter((edge) => edge?.node).map((edge) => edge?.node) || [],
    [reportType?.subTypes?.edges],
  )

  const onClose = () => {
    handleClose()
    setCurrentStep(STEPS.report)
  }

  const handleReport = () => {
    if (isMutationInFlight || !targetId || !reportType) {
      return
    }
    commitMutation({
      variables: {
        input: {
          reportSubject: reportText,
          reportTypeId: reportType.id,
          targetObjectId: targetId,
        },
      },
      onCompleted: (_, errors) => {
        if (!errors) {
          setCurrentStep(STEPS.confirmation)
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
      name: STEPS.report,
      content: (
        <SelectReportTypeStep
          reportTypes={reportTypes}
          reportType={reportType}
          setReportType={setReportType}
          setCurrentStep={setCurrentStep}
          setReportSubType={setReportSubType}
        />
      ),
    },
    {
      name: STEPS.subTypes,
      content: (
        <SelectReportTypeStep
          reportTypes={subTypes}
          reportType={reportType}
          setReportType={setReportType}
          setCurrentStep={setCurrentStep}
          setReportSubType={setReportSubType}
          subType
        />
      ),
    },
    {
      name: STEPS.text,
      content: (
        <TextStep
          reportText={reportText}
          setReportText={setReportText}
          setCurrentStep={setCurrentStep}
        />
      ),
    },
    {
      name: STEPS.summary,
      content: (
        <SummaryStep
          reportType={reportType}
          reportSubType={reportSubType}
          reportText={reportText}
          isMutationInFlight={isMutationInFlight}
          handleReport={handleReport}
        />
      ),
    },
    {
      name: STEPS.confirmation,
      content: <ConfirmationStep reportType={reportType} onClose={onClose} />,
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
          {currentStep === STEPS.confirmation ? (
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
