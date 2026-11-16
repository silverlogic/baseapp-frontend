'use client'

import { FC } from 'react'

import { Dialog } from '@baseapp-frontend/design-system/components/web/dialogs'

import { Box, Divider, LinearProgress, Typography } from '@mui/material'
import { Elements } from '@stripe/react-stripe-js'

import AddCardForm from './AddCardForm'
import { AddCardModalProps } from './types'

const AddCardModal: FC<AddCardModalProps> = ({
  entityId,
  open,
  onClose,
  stripe,
  clientSecret,
  handleSetupSuccess,
}) => (
  <Dialog open={open} onClose={onClose}>
    {open && (
      <Box padding={4} display="flex" flexDirection="column" gap={2}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Add payment method</Typography>
        </Box>
        <Typography variant="subtitle2">Card Information</Typography>
        <Divider variant="fullWidth" sx={{ backgroundColor: 'divider', color: 'divider' }} />
        {clientSecret ? (
          // Stripe.js only takes a SetupIntent's secret when Elements is created: changing it
          // afterwards (elements.update) is not supported, and since the clover release it
          // refuses an intent that is already confirmed. So every SetupIntent mounts its own
          // Elements, keyed by its secret.
          <Elements key={clientSecret} stripe={stripe} options={{ clientSecret }}>
            <AddCardForm
              entityId={entityId}
              onClose={onClose}
              handleSetupSuccess={handleSetupSuccess}
            />
          </Elements>
        ) : (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        )}
      </Box>
    )}
  </Dialog>
)

export default AddCardModal
