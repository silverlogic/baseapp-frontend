import { Dialog } from '@baseapp-frontend/design-system/components/web/dialogs'

import { Box, Button, Typography } from '@mui/material'

import { CancelSubscriptionModalContainer } from './styled'
import { CancelSubscriptionModalProps } from './types'

const CancelSubscriptionModal: React.FC<CancelSubscriptionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => (
  <Dialog open={isOpen} onClose={onClose} aria-labelledby="cancel-subscription-modal-title">
    {isOpen && (
      <CancelSubscriptionModalContainer>
        <Typography variant="h6" id="cancel-subscription-modal-title" gutterBottom>
          Cancel Subscription
        </Typography>
        <Box sx={{ py: '12px' }}>
          <Typography variant="body1" gutterBottom color="text.secondary">
            Are you sure you want to cancel your subscription? You will retain access to your
            current plan until the end of the billing period. After that, your account will be
            downgraded to the free plan.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button variant="outlined" onClick={onClose} color="inherit">
            Back
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Cancel Subscription
          </Button>
        </Box>
      </CancelSubscriptionModalContainer>
    )}
  </Dialog>
)
export default CancelSubscriptionModal
