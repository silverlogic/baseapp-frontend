import { FC } from 'react'

import getUser from '@baseapp-frontend/authentication/dist/modules/user/getUser'
import { ConfirmDialog } from '@baseapp-frontend/design-system/components/web/dialogs'

import { Box, Button, Typography } from '@mui/material'

import { maskEmail } from '../utils'
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

  return (
    <ConfirmDialog
      hideCancelButton
      customMaxWidth={400}
      title={<Typography variant="h6"> Successfully Subscribed</Typography>}
      content={
        <>
          <Box>
            <Typography variant="body2">
              Thank you for your subscription! Access the plan details by clicking on the button
              below
              {user?.email && ` or in the email we just sent to.`}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" fontWeight={700} color="text.secondary">
              {user?.email && maskedEmail}
            </Typography>
          </Box>
          {orderNumber && (
            <Box
              display="flex"
              flexDirection="row"
              marginTop={2}
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2" fontWeight={700} color="text.secondary">
                Order Number:
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {orderNumber}
              </Typography>
            </Box>
          )}
        </>
      }
      action={
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
      }
      onClose={onClose}
      open={open}
    />
  )
}

export default ConfirmationSubscriptionModal
