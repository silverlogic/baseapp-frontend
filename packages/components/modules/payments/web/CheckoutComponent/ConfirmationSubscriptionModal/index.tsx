import { FC } from 'react'

import getUser from '@baseapp-frontend/authentication/dist/modules/user/getUser'
import { CloseIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Box, Button, IconButton, Modal, Typography } from '@mui/material'

import { maskEmail } from '../utils'

interface ConfirmationSubscriptionModalProps {
  open: boolean
  onClose: () => void
  orderNumber: string | null
}

const ConfirmationSubscriptionModal: FC<ConfirmationSubscriptionModalProps> = ({
  open,
  onClose,
  orderNumber,
}) => {
  const handleViewPlanDetails = () => {
    onClose()
    // TODO: Add navigation to subscription details page
  }
  const user = getUser()
  const maskedEmail = maskEmail(user?.email)

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="subscription-confirmation-title">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 400 },
          maxWidth: 500,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Successfully Subscribed</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ fontSize: '24px' }} />
          </IconButton>
        </Box>

        <Box>
          <Typography variant="body2">
            Thank you for your subscription! Access the plan details by clicking on the button below
            {user?.email && ` or in the email we just sent to.`}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" fontWeight={700} color="text.secondary">
            {user?.email && maskedEmail}
          </Typography>
        </Box>
        {orderNumber && (
          <Box display="flex" flexDirection="row">
            <Typography variant="body2" fontWeight={700} color="text.secondary">
              Order Number:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {orderNumber}
            </Typography>
          </Box>
        )}

        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleViewPlanDetails}
            sx={{
              minWidth: 'auto',
              px: 3,
              py: 1,
              width: 'auto',
            }}
          >
            Plan Details
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ConfirmationSubscriptionModal
