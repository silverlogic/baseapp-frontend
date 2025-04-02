import { FC } from 'react'

import getUser from '@baseapp-frontend/authentication/dist/modules/user/getUser'
import { CloseIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Box, Button, IconButton, Modal, Theme, Typography, useMediaQuery } from '@mui/material'

import { maskEmail } from '../utils'
import { ConfirmationSubscriptionModalStyled } from './styled'
import { ConfirmationSubscriptionModalProps } from './types'

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
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="subscription-confirmation-title">
      <ConfirmationSubscriptionModalStyled isMobile={isMobile}>
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
      </ConfirmationSubscriptionModalStyled>
    </Modal>
  )
}

export default ConfirmationSubscriptionModal
