'use client'

import { FC, Suspense, useMemo, useState } from 'react'

import {
  NegativeCheckMarkIcon,
  OutlinedCheckMarkIcon,
} from '@baseapp-frontend/design-system/components/web/icons'
import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'

import { Box, CircularProgress, Typography } from '@mui/material'
import { useLazyLoadQuery } from 'react-relay'

import { ReportTypeListQuery as ReportTypeListQueryType } from '../../../../../../__generated__/ReportTypeListQuery.graphql'
import { useReportCreateMutation } from '../../../../common/graphql/mutations/ReportCreate'
import { ReportTypeListQuery } from '../../../../common/graphql/queries/ReportTypeList'
import { STEPS } from '../constants'
import { ReportButtonWithDialogProps, ReportTypeNode, ReportTypeSubTypeNode } from '../types'
import ConfirmationStep from './ConfirmationStep'
import SelectReportTypeStep from './SelectReportTypeStep'
import SummaryStep from './SummaryStep'
import TextStep from './TextStep'

const ReportDialogContent: FC<ReportButtonWithDialogProps> = ({ targetId, handleClose }) => {
  const { allReportTypes } = useLazyLoadQuery<ReportTypeListQueryType>(ReportTypeListQuery, {
    topLevelOnly: true,
    targetObjectId: targetId,
  })
  const [currentStep, setCurrentStep] = useState(STEPS.report)
  const [reportType, setReportType] = useState<ReportTypeNode>()
  const [reportSubType, setReportSubType] = useState<ReportTypeSubTypeNode>()
  const [reportText, setReportText] = useState('')

  const smDown = useResponsive('down', 'sm')
  const [commitMutation, isMutationInFlight] = useReportCreateMutation()
  const reportTypes = useMemo(
    () => allReportTypes?.edges?.filter((edge) => edge?.node).map((edge) => edge?.node) || [],
    [allReportTypes?.edges],
  ).sort((a, b) => {
    if (!a) return -1
    if (!b) return 1
    if (a.key === 'other') return 1
    if (b.key === 'other') return -1
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
    <Box display="flex" flexDirection="column" padding={smDown ? 2 : 4} gap={2}>
      {currentStep === STEPS.confirmation ? (
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          justifyContent={smDown ? 'center' : 'flex-start'}
        >
          {smDown ? (
            <OutlinedCheckMarkIcon sx={{ color: 'success.main', width: 55, height: 55 }} />
          ) : (
            <>
              <NegativeCheckMarkIcon sx={{ color: 'success.main', width: 35, height: 35 }} />
              <Typography variant="subtitle1">Report</Typography>
            </>
          )}
        </Box>
      ) : (
        <Box display="flex" justifyContent={smDown ? 'center' : 'flex-start'}>
          <Typography variant={smDown ? 'caption' : 'subtitle1'}>Report</Typography>
        </Box>
      )}
      {steps?.find((step) => step.name === currentStep)?.content}
    </Box>
  )
}

const ReportDialogContentSuspended: FC<ReportButtonWithDialogProps> = ({
  targetId,
  handleClose,
}) => (
  <Suspense
    fallback={
      <Box display="flex" alignItems="center" justifyContent="center" height="100%" padding={4}>
        <CircularProgress />
      </Box>
    }
  >
    <ReportDialogContent targetId={targetId} handleClose={handleClose} />
  </Suspense>
)

export default ReportDialogContentSuspended
