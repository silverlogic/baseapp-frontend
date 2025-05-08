import { Box, Button, Modal, Typography } from '@mui/material'

import { ICancelSubscriptionModal } from './types'

const CancelSubscriptionModal: React.FC<ICancelSubscriptionModal> = ({
  isOpen,
  onClose,
  onConfirm,
}) => (
    <Modal open={isOpen} onClose={onClose} aria-labelledby="cancel-subscription-modal-title">
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
        }}
      >
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
      </Box>
    </Modal>
  )
export default CancelSubscriptionModal
