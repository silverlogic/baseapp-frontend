'use client'

import { FC, useState } from 'react'

import { FlagIcon } from '@baseapp-frontend/design-system/components/common/icons'
import { Dialog } from '@baseapp-frontend/design-system/components/web/dialogs'
import { ChevronIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Box, Button, Divider, MenuItem, TextField, Typography } from '@mui/material'

import { CategoryButton } from './styled'
import { ReportButtonWithDialogProps, ReportCategory } from './types'

const mainCategories: ReportCategory[] = [
  {
    name: 'scam',
    title: 'Scam or fraud',
    subCategories: [],
  },
  {
    name: 'adultContent',
    title: 'Adult Content',
    subCategories: [
      {
        name: 'pornography',
        title: 'Pornography',
        subCategories: [],
      },
      {
        name: 'childAbuse',
        title: 'Child abuse',
        subCategories: [],
      },
      {
        name: 'prostituition',
        title: 'Prostituition',
        subCategories: [],
      },
    ],
  },
  {
    name: 'violence',
    title: 'Violence, hate or exploitation',
    subCategories: [],
  },
  {
    name: 'bulling',
    title: 'Bulling or unwanted contact',
    subCategories: [],
  },
  {
    name: 'other',
    title: 'Other',
    subCategories: [],
  },
]

const ReportButtonWithDialog: FC<ReportButtonWithDialogProps> = ({
  currentProfileId,
  handleClose,
  target,
}) => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState('report')
  const [reportCategory, setReportCategory] = useState<ReportCategory>()
  const [reportSubCategory, setReportSubCategory] = useState<ReportCategory>()
  const [reportText, setReportText] = useState('')

  const handleReport = () => {
    console.log('Reported')
    console.log('reportCategory', reportCategory)
    console.log('reportSubCategory', reportSubCategory)
    console.log('reportText', reportText)
    console.log('currentProfileId', currentProfileId)
    console.log('target', target)
    setCurrentStep('confirmation')
  }

  const onClose = () => {
    handleClose()
    setCurrentStep('report')
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
            {mainCategories.map((category) => (
              <CategoryButton
                key={category.name}
                onClick={() => {
                  if (category.subCategories.length) {
                    setReportCategory(category)
                    setCurrentStep('subCategory')
                    return
                  }
                  setReportCategory(category)
                  setCurrentStep('reportText')
                }}
                endIcon={<ChevronIcon position="right" />}
              >
                <Typography variant="body2">{category.title}</Typography>
              </CategoryButton>
            ))}
          </Box>
        </>
      ),
    },
    {
      name: 'subCategory',
      content: (
        <>
          <Typography variant="h5">{reportCategory?.title}</Typography>
          <Divider />
          <Box display="flex" flexDirection="column">
            {reportCategory?.subCategories?.map((subCategory) => (
              <CategoryButton
                key={subCategory.name}
                onClick={() => {
                  setReportSubCategory(subCategory)
                  setCurrentStep('reportText')
                }}
                endIcon={<ChevronIcon position="right" />}
              >
                <Typography variant="body2">{subCategory.title}</Typography>
              </CategoryButton>
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
          <Typography variant="caption">{reportCategory?.title}</Typography>
          {reportCategory?.subCategories && reportCategory?.subCategories?.length > 0 && (
            <>
              <Typography variant="body2">What type of {reportCategory?.title}?</Typography>
              <Typography variant="caption">{reportSubCategory?.title}</Typography>
            </>
          )}
          <Typography variant="body2">About the problem</Typography>
          <Typography variant="caption">{reportText}</Typography>
          <Button onClick={handleReport}>Submit Report</Button>
        </>
      ),
    },
    {
      name: 'confirmation',
      content: (
        <>
          <Typography variant="h5">Thanks for reporting {reportCategory?.title}</Typography>
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
