import { FC } from 'react'

import { ChevronIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'

import { Box, Divider, Typography } from '@mui/material'

import { STEPS } from '../constants'
import { TypeButton } from '../styled'
import { ReportTypeNode, ReportTypeSubTypeNode, SelectReportTypeStepProps } from '../types'

const SelectReportTypeStep: FC<SelectReportTypeStepProps> = ({
  reportTypes,
  reportType,
  subType = false,
  setReportType,
  setCurrentStep,
  setReportSubType,
}) => {
  const smDown = useResponsive('down', 'sm')
  const renderReportTypeButtons = (
    types:
      | ReadonlyArray<ReportTypeNode | null | undefined>
      | ReadonlyArray<ReportTypeSubTypeNode | null | undefined>,
  ) =>
    types?.map((type) => (
      <TypeButton
        key={type?.id}
        onClick={() => {
          if (subType) {
            setReportSubType(type as ReportTypeSubTypeNode)
            setCurrentStep(STEPS.text)
            return
          }
          setReportType(type as ReportTypeNode)
          if ((type as ReportTypeNode)?.subTypes?.edges?.length) {
            setCurrentStep(STEPS.subTypes)
            return
          }
          setCurrentStep(STEPS.text)
        }}
        endIcon={<ChevronIcon position="right" />}
      >
        <Typography variant="body2">{type?.label}</Typography>
      </TypeButton>
    ))

  return (
    <>
      {subType ? (
        <Typography variant="h5">{reportType?.label}</Typography>
      ) : (
        <>
          <Box>
            <Typography variant="h5" textAlign={smDown ? 'center' : 'left'}>
              Why are you reporting this?
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" textAlign={smDown ? 'center' : 'left'}>
              Your report is anonymous. If someone is in immediate danger, call the local emergency
              services - don&apos;t wait.
            </Typography>
          </Box>
        </>
      )}
      <Divider />
      <Box display="flex" flexDirection="column">
        {reportTypes && renderReportTypeButtons(reportTypes)}
      </Box>
    </>
  )
}

export default SelectReportTypeStep
