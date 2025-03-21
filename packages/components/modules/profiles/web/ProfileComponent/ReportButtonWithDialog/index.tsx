'use client'

import { FC, useState } from 'react'

import { FlagIcon } from '@baseapp-frontend/design-system/components/common/icons'
import { Dialog } from '@baseapp-frontend/design-system/components/web/dialogs'
import { ChevronIcon } from '@baseapp-frontend/design-system/components/web/icons'
// import { useNotification } from '@baseapp-frontend/utils'

import { Box, Button, Divider, MenuItem, TextField, Typography } from '@mui/material'
// import { useMutation } from 'react-relay'

// import { ReportTypes } from '../../../../../__generated__/ReportCreateMutation.graphql'
// import { ReportCreateMutation, ReportTypes } from '../../../../../__generated__/ReportCreateMutation.graphql'
// import { ReportCreateMutationQuery } from '../../../common/graphql/mutations/ReportCreate'
import { TypeButton } from './styled'
import { ReportButtonWithDialogProps } from './types'

const mainTypes = [
  {
    name: 'scam',
    label: 'Scam or fraud',
    parentType: null,
    subTypes: [],
  },
  {
    name: 'adultContent',
    label: 'Adult Content',
    parentType: null,
    subTypes: [
      {
        name: 'pornography',
        label: 'Pornography',
        parentType: 'adultContent',
      },
      {
        name: 'childAbuse',
        label: 'Child abuse',
        parentType: 'adultContent',
      },
      {
        name: 'prostituition',
        label: 'Prostituition',
        parentType: 'adultContent',
      },
    ],
  },
  {
    name: 'violence',
    label: 'Violence, hate or exploitation',
    parentType: null,
    subTypes: [],
  },
  {
    name: 'bulling',
    label: 'Bulling or unwanted contact',
    parentType: null,
    subTypes: [],
  },
  {
    name: 'other',
    label: 'Other',
    parentType: null,
    subTypes: [],
  },
]

const ReportButtonWithDialog: FC<ReportButtonWithDialogProps> = ({
  target: targetRef,
  handleClose,
}) => {
  // const target = useFragment(ReportCreateFragment, targetRef)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState('report')
  // const [reportType, setReportType] = useState()
  // const [reportSubType, setReportSubType] = useState<ReportTypes>()
  const [reportText, setReportText] = useState('')

  // const [commitMutation, isMutationInFlight] = useMutation(ReportCreateMutationQuery)
  // const [commitMutation, isMutationInFlight] = useMutation<ReportCreateMutation>(ReportCreateMutationQuery)
  // const { sendToast } = useNotification()

  const onClose = () => {
    handleClose()
    setCurrentStep('report')
  }

  const handleReport = () => {
    console.log('Reported', target.id)
  //   if (isMutationInFlight || !targetId) {
  //     return
  //   }
  //   commitMutation({
  //     variables: {
  //       input: {
  //         reportSubject: reportText,
  //         reportType,
  //         targetObjectId: targetId,
  //       },
  //     },
  //     onCompleted: (response, errors) => {
  //       if (!errors) {
  //         setCurrentStep('confirmation')
  //         return
  //       }
  //       errors?.forEach((error) => {
  //         sendToast(error.message, { type: 'error' })
  //       })
  //       onClose()
  //     },
  //     onError: () => {
  //       onClose()
  //     },
  //   })
  }

  // const findReportTypeByName = (
  //   name: string,
  //   types: ReportType[]
  // ): ReportType | null => {
  //   for (const type of types) {
  //     if (type.name === name) {
  //       return type
  //     }
  //     const found = findReportTypeByName(name, type.subTypes)
  //     if (found) {
  //       return found
  //     }
  //   }
  //   return null
  // }

  // const RenderReportChain = ({
  //   reportType,
  //   allTypes,
  // }) => {
  //   const parent =
  //     reportType.parentType && findReportTypeByName(reportType.parentType, allTypes)
  //   return (
  //     <>
  //       {parent && <RenderReportChain reportType={parent} allTypes={allTypes} />}
  //       {parent && (
  //         <Typography variant="body2">
  //           What type of {parent.label}?
  //         </Typography>
  //       )}
  //       <Typography variant="caption">{reportType.label}</Typography>
  //     </>
  //   )
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
                    // setReportType(type.name as ReportTypes)
                    setCurrentStep('subTypes')
                    return
                  }
                  // setReportType(type.name as ReportTypes)
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
    // {
    //   name: 'subTypes',
    //   content: (
    //     <>
    //       <Typography variant="h5">{reportType?.label}</Typography>
    //       <Divider />
    //       <Box display="flex" flexDirection="column">
    //         {(!reportSubType ? reportType?.subTypes : reportSubType.subTypes).map((subType) => (
    //           <TypeButton
    //             key={subType.name}
    //             onClick={() => {
    //               if (subType.subTypes.length > 0) {
    //                 setReportSubType(subType)
    //                 return
    //               }
    //               setReportSubType(subType)
    //               setCurrentStep('reportText')
    //             }}
    //             endIcon={<ChevronIcon position="right" />}
    //           >
    //             <Typography variant="body2">{subType.label}</Typography>
    //           </TypeButton>
    //         ))}
    //       </Box>
    //     </>
    //   ),
    // },
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
          {/* {!reportSubType ? (<Typography variant="caption">{reportType?.label}</Typography>}) :
            RenderReportChain({ reportType, allTypes: mainTypes })
          } */}
          <Typography variant="body2">About the problem</Typography>
          <Typography variant="caption">{reportText}</Typography>
          <Button onClick={handleReport}>
          {/* <Button disabled={isMutationInFlight} onClick={handleReport}> */}
            Submit Report
          </Button>
        </>
      ),
    },
    {
      name: 'confirmation',
      content: (
        <>
          {/* <Typography variant="h5">Thanks for reporting {reportType?.label}</Typography> */}
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
