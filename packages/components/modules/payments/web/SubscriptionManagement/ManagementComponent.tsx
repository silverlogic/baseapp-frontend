'use client'

import { FC, useEffect, useMemo, useState } from 'react'

import { useNotification } from '@baseapp-frontend/utils'

import { Check } from '@mui/icons-material'
import {
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import { useElements, useStripe } from '@stripe/react-stripe-js'
import { useQueryClient } from '@tanstack/react-query'

import PaymentDropdown from '../CheckoutComponent/PaymentDropDown'
import useStripeHook from '../hooks/useStripeHook'
import { SUBSCRIPTION_API_KEY } from '../services/keys'
import CancelSubscriptionModal from './CancelSubscriptionModal'
import {
  CancelButton,
  ChangePlanButton,
  FlexContainer,
  PaymentMethodContainer,
  SubscriptionManagementContainer,
  SubscriptionPlanContainer,
} from './styled'
import { ManagementComponentProps } from './types'

const ManagementComponent: FC<ManagementComponentProps> = ({
  subscriptionId,
  entityId,
  handleSetupSuccess,
  lastAddedPaymentMethodIdDuringSession,
}) => {
  const queryClient = useQueryClient()

  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false)
  const [isCancelSubscriptionModalOpen, setIsCancelSubscriptionModalOpen] = useState(false)
  const {
    useListPaymentMethods,
    useGetSubscription,
    useGetProduct,
    useCancelSubscription,
    useUpdateSubscription,
  } = useStripeHook()

  const {
    data: subscription,
    isLoading: isLoadingSubscription,
    refetch: refetchSubscription,
  } = useGetSubscription(subscriptionId)
  const { data: product, isLoading: isLoadingProduct } = useGetProduct(
    subscription?.plan?.product || '',
  )
  const { data: paymentMethods, isLoading: isLoadingMethods } = useListPaymentMethods(entityId)
  const { mutate: cancelSubscription } = useCancelSubscription(subscriptionId, refetchSubscription)

  const { sendToast } = useNotification()

  const selectedPaymentMethodId = useMemo(() => {
    if (!paymentMethods || paymentMethods.length === 0) return ''

    if (subscription?.defaultPaymentMethod) {
      const defaultPM = paymentMethods.find((pm) => pm.id === subscription.defaultPaymentMethod)
      if (defaultPM) return defaultPM.id
    }
    const fallbackDefault = paymentMethods.find((pm) => pm.isDefault)

    return fallbackDefault ? fallbackDefault.id : paymentMethods[0]?.id
  }, [paymentMethods, subscription?.defaultPaymentMethod, lastAddedPaymentMethodIdDuringSession])

  const { mutateAsync: updateSubscription } = useUpdateSubscription(
    subscriptionId,
    refetchSubscription,
    {
      onSuccess: () => {
        sendToast('Subscription updated successfully.', { type: 'success' })
      },
      onError: () => {
        sendToast(`Failed to update payment method`, { type: 'error' })
      },
    },
  )

  const elements = useElements()
  const stripe = useStripe()
  const isLoading = isLoadingMethods || isLoadingSubscription || isLoadingProduct

  const amountDue = subscription?.plan?.amount ? subscription.plan.amount / 100 : 0
  const nextPaymentAttempt = useMemo(() => {
    const currentPeriodEnd = subscription?.items?.data[0]?.currentPeriodEnd ?? 0
    return currentPeriodEnd ? new Date(currentPeriodEnd * 1000) : null
  }, [subscription?.items?.data])

  const getFormattedNextPaymentAttempt = (paymentAttempt: Date | null): string => {
    if (!paymentAttempt) {
      return ''
    }

    const day = String(paymentAttempt.getDate()).padStart(2, '0')
    const month = String(paymentAttempt.getMonth() + 1).padStart(2, '0')
    const year = paymentAttempt.getFullYear()

    return `${month}/${day}/${year}`
  }

  const formattedNextPaymentAttempt = useMemo(
    () => getFormattedNextPaymentAttempt(nextPaymentAttempt),
    [nextPaymentAttempt],
  )

  const features = product?.marketingFeatures ?? []
  const description = product?.description || ''
  const isSubscriptionActive = subscription?.status === 'active'

  const handleUpdateSubscription = async (paymentMethodId: string) => {
    try {
      await updateSubscription({
        defaultPaymentMethod: paymentMethodId,
      })
    } catch (error) {
      console.error('Error updating subscription:', error)
    }
  }

  useEffect(() => {
    if (lastAddedPaymentMethodIdDuringSession) {
      handleUpdateSubscription(lastAddedPaymentMethodIdDuringSession)
    }
  }, [lastAddedPaymentMethodIdDuringSession])

  return isLoading ? (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        margin: 'auto',
      }}
    >
      <LinearProgress sx={{ width: '50%' }} />
    </Box>
  ) : (
    <SubscriptionManagementContainer>
      <Typography variant="h4" component="h2">
        Subscription
      </Typography>
      <SubscriptionPlanContainer>
        <FlexContainer>
          <Typography variant="h4" component="p">
            {product?.name || 'Subscription Plan'}
          </Typography>
          {isSubscriptionActive && (
            <Chip label="Active" color="success" variant="soft" sx={{ alignSelf: 'flex-end' }} />
          )}
        </FlexContainer>
        <Box>
          <Typography variant="body1" component="p">
            {description}
          </Typography>
        </Box>
        <Box>
          <FlexContainer>
            <List>
              {features.map((feature) => (
                <ListItem sx={{ paddingLeft: 0 }} key={feature?.name}>
                  <ListItemIcon>
                    <Check />
                  </ListItemIcon>
                  <ListItemText primary={feature?.name} />
                </ListItem>
              ))}
            </List>
          </FlexContainer>
        </Box>
        <Divider
          sx={{
            width: 'calc(100% + 48px)',
            marginLeft: '-24px',
          }}
        />
      </SubscriptionPlanContainer>
      <PaymentMethodContainer>
        <FlexContainer flexDirection="column">
          <Typography
            variant="body1"
            component="p"
            sx={{
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: '155.55%',
            }}
          >
            Payment
          </Typography>
          {amountDue && nextPaymentAttempt && isSubscriptionActive && (
            <Typography
              variant="body1"
              component="p"
              sx={{
                fontSize: '14px',
                fontStyle: 'normal',
                lineHeight: '157.14%',
              }}
            >
              Your next bill is for <strong>${amountDue.toFixed(2)}</strong> on{' '}
              <strong>{formattedNextPaymentAttempt}</strong>
            </Typography>
          )}
        </FlexContainer>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            width: '100%',
            flex: 1,
          }}
        >
          <Box display="flex" sx={{ py: '8px' }}>
            {elements && stripe && (
              <PaymentDropdown
                handleSetupSuccess={handleSetupSuccess}
                entityId={entityId}
                paymentMethods={paymentMethods || []}
                selectedPaymentMethodId={selectedPaymentMethodId || ''}
                setSelectedPaymentMethodId={handleUpdateSubscription}
                elements={elements}
                stripe={stripe}
                isAddCardModalOpen={isAddCardModalOpen}
                setIsAddCardModalOpen={setIsAddCardModalOpen}
              />
            )}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '8px',
              width: '100%',
              marginTop: 'auto',
            }}
          >
            <CancelButton
              variant="text"
              color="error"
              onClick={() => {
                setIsCancelSubscriptionModalOpen(true)
              }}
            >
              Cancel Subscription
            </CancelButton>
            <ChangePlanButton variant="contained" color="inherit">
              Change Plan
            </ChangePlanButton>
          </Box>
        </Box>
      </PaymentMethodContainer>
      <CancelSubscriptionModal
        isOpen={isCancelSubscriptionModalOpen}
        onClose={() => setIsCancelSubscriptionModalOpen(false)}
        onConfirm={() => {
          cancelSubscription()
          queryClient.invalidateQueries({ queryKey: [SUBSCRIPTION_API_KEY.get(), subscriptionId] })
          setIsCancelSubscriptionModalOpen(false)
        }}
      />
    </SubscriptionManagementContainer>
  )
}
export default ManagementComponent
