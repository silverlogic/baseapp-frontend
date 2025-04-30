'use client'

import { FC, useState } from 'react'

import { Dialog } from '@baseapp-frontend/design-system/components/web/dialogs'
import { FlagIcon } from '@baseapp-frontend/design-system/components/web/icons'
import { useResponsive } from '@baseapp-frontend/design-system/hooks/web'

import { MenuItem, Typography } from '@mui/material'

import ReportDialogContent from './components/ReportDialogContent'
import { StyledSwipeableDrawer } from './styled'
import { ReportButtonWithDialogProps } from './types'

const ReportButtonWithDialog: FC<ReportButtonWithDialogProps> = ({ targetId, handleClose }) => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const smDown = useResponsive('down', 'sm')

  return (
    <>
      <MenuItem onClick={() => setIsReportModalOpen(true)} disableRipple>
        <Typography variant="body2" color="error.main" noWrap>
          <FlagIcon sx={{ color: 'error.main', marginRight: '5px' }} />
          Report profile
        </Typography>
      </MenuItem>
      {smDown && (
        <StyledSwipeableDrawer anchor="bottom" open={isReportModalOpen} onClose={handleClose}>
          {isReportModalOpen && (
            <ReportDialogContent targetId={targetId} handleClose={handleClose} />
          )}
        </StyledSwipeableDrawer>
      )}
      {!smDown && (
        <Dialog open={isReportModalOpen} onClose={handleClose}>
          {isReportModalOpen && (
            <ReportDialogContent targetId={targetId} handleClose={handleClose} />
          )}
        </Dialog>
      )}
    </>
  )
}

export default ReportButtonWithDialog
