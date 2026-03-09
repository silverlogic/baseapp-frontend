'use client'

import { FC, useEffect, useMemo, useState } from 'react'

import { formatDateFromApi, useNotification } from '@baseapp-frontend/utils'

import { Check } from '@mui/icons-material'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import { Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'

import PaymentDropdown from '../PaymentDropDown'
import useStripeHook from '../hooks/useStripeHook'
import { STRIPE_API_KEY } from '../services/stripe'
import { getStripePromise } from '../utils/stripe'
import CancelSubscriptionModal from './CancelSubscriptionModal'
import FreePlanComponent from './FreePlanComponent'
import {
  ColumnFlexContainer,
  PaymentMethodContainer,
  RowFlexContainer,
  SubscriptionPlanContainer,
} from './styled'
import { SubscriptionManagementProps } from './types'
import { getChipLabelAndColorByStatus } from './utils'

const SubscriptionManagement: FC<SubscriptionManagementProps> = ({ entityId }) => {
  const [lastAddedPaymentMethodIdDuringSession, setLastAddedPaymentMethodIdDuringSession] =
    useState<string | null>(null)
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false)
  const [isCancelSubscriptionModalOpen, setIsCancelSubscriptionModalOpen] = useState(false)
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null)

  const queryClient = useQueryClient()
  const invalidateCustomer = () => {
    queryClient.invalidateQueries({ queryKey: [STRIPE_API_KEY.getCustomer(entityId)] })
  }

  const {
    useListPaymentMethods,
    useGetSubscription,
    useCancelSubscription,
    useUpdateSubscription,
    useGetCustomer,
  } = useStripeHook()
  const { data: customer, refetch: refetchCustomer } = useGetCustomer(entityId)
  const {
    data: subscription,
    isLoading: isLoadingSubscription,
    refetch: refetchSubscription,
  } = useGetSubscription(subscriptionId ?? '')
  const { data: paymentMethods, isLoading: isLoadingMethods } = useListPaymentMethods(entityId)
  const { mutate: cancelSubscription } = useCancelSubscription(
    subscription?.id ?? '',
    invalidateCustomer,
  )
  const { sendToast } = useNotification()
  const elements = useElements()
  const stripe = useStripe()
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabRedirect = searchParams.get('tab')
  const isLoading = isLoadingMethods || isLoadingSubscription
  const { mutateAsync: updateSubscription } = useUpdateSubscription(subscription?.id ?? '', {
    onSuccess: () => {
      invalidateCustomer()
      queryClient.invalidateQueries({
        queryKey: [
          STRIPE_API_KEY.listPaymentMethods(),
          STRIPE_API_KEY.getSubscription(subscriptionId ?? ''),
        ],
      })
      sendToast('Subscription updated successfully.', { type: 'success' })
    },
    onError: (error) => {
      console.error('Error updating subscription:', error)
      sendToast(`Failed to update payment method`, { type: 'error' })
    },
  })

  const amountDue = (subscription?.upcomingInvoice?.amountDue ?? 0) / 100
  const nextPaymentAttempt = formatDateFromApi(subscription?.upcomingInvoice?.nextPaymentAttempt)
  const hasNextBill = subscription?.status === 'active'
  const hasSubscription = customer?.subscriptions?.length && customer.subscriptions.length > 0
  const marketingFeatures = subscription?.product?.marketingFeatures ?? []
  const selectedPaymentMethodId = useMemo(() => {
    if (!paymentMethods || paymentMethods.length === 0) return ''
    if (lastAddedPaymentMethodIdDuringSession) {
      return lastAddedPaymentMethodIdDuringSession
    }
    if (subscription?.defaultPaymentMethod) {
      const defaultPM = paymentMethods.find((pm) => pm.id === subscription.defaultPaymentMethod)
      if (defaultPM) return defaultPM.id
    }
    const fallbackDefault = paymentMethods.find((pm) => pm.isDefault)
    return fallbackDefault ? fallbackDefault.id : paymentMethods[0]?.id
  }, [paymentMethods, subscription?.defaultPaymentMethod, lastAddedPaymentMethodIdDuringSession])
  const { label, color } = getChipLabelAndColorByStatus(subscription?.status ?? '')

  const handleSetupSuccess = (paymentMethodId: string) => {
    if (paymentMethodId) {
      setLastAddedPaymentMethodIdDuringSession(paymentMethodId)
    }
  }

  const handleUpdateSubscription = async (paymentMethodId: string) => {
    try {
      await updateSubscription({
        defaultPaymentMethod: paymentMethodId,
      })
      setLastAddedPaymentMethodIdDuringSession(paymentMethodId)
    } catch (error) {
      console.error('Error updating subscription:', error)
    }
  }

  useEffect(() => {
    if (lastAddedPaymentMethodIdDuringSession) {
      handleUpdateSubscription(lastAddedPaymentMethodIdDuringSession)
    }
  }, [lastAddedPaymentMethodIdDuringSession])

  useEffect(() => {
    if (customer?.subscriptions?.[0]?.id) {
      setSubscriptionId(customer.subscriptions[0].id)
      refetchSubscription()
    }
  }, [customer])

  useEffect(() => {
    if (!tabRedirect || tabRedirect !== 'subscription') return
    refetchCustomer()
  }, [tabRedirect])

  if (!hasSubscription && !isLoading) {
    return <FreePlanComponent onPlanChange={() => router.push('/subscriptions')} />
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h4" component="h2">
        Subscription
      </Typography>
      {isLoading && <CircularProgress sx={{ margin: 'auto' }} />}
      {!isLoading && (
        <>
          <Card>
            <CardContent>
              <SubscriptionPlanContainer>
                <RowFlexContainer>
                  <Typography variant="h4" component="p">
                    {subscription?.product?.name ?? 'Subscription Plan'}
                  </Typography>
                  {label && color && <Chip label={label} color={color} variant="soft" />}
                </RowFlexContainer>
                <Typography variant="body1" component="p">
                  {subscription?.product?.description ?? ''}
                </Typography>
                {marketingFeatures.length > 0 && (
                  <RowFlexContainer>
                    <List>
                      {marketingFeatures.map((feature) => (
                        <ListItem sx={{ paddingLeft: 0 }} key={feature?.name}>
                          <ListItemIcon>
                            <Check />
                          </ListItemIcon>
                          <ListItemText primary={feature?.name ?? ''} />
                        </ListItem>
                      ))}
                    </List>
                  </RowFlexContainer>
                )}
                <Divider
                  sx={{
                    width: 'calc(100% + 48px)',
                    marginLeft: -3,
                    marginY: 2,
                  }}
                />
              </SubscriptionPlanContainer>
              <PaymentMethodContainer>
                <ColumnFlexContainer>
                  <Typography variant="h6">Payment</Typography>
                  {nextPaymentAttempt && hasNextBill && (
                    <Typography variant="body2">
                      Your next bill is{' '}
                      {amountDue !== 0 ? (
                        <>
                          for <strong>${amountDue.toFixed(2)}</strong>
                        </>
                      ) : (
                        'free'
                      )}{' '}
                      on <strong>{nextPaymentAttempt}</strong>
                    </Typography>
                  )}
                </ColumnFlexContainer>
                {elements && stripe && (
                  <PaymentDropdown
                    handleSetupSuccess={handleSetupSuccess}
                    entityId={entityId}
                    paymentMethods={paymentMethods ?? []}
                    selectedPaymentMethodId={selectedPaymentMethodId ?? ''}
                    setSelectedPaymentMethodId={handleUpdateSubscription}
                    elements={elements}
                    stripe={stripe}
                    isAddCardModalOpen={isAddCardModalOpen}
                    setIsAddCardModalOpen={setIsAddCardModalOpen}
                  />
                )}
              </PaymentMethodContainer>
            </CardContent>
          </Card>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: 'auto',
            }}
          >
            <Button
              variant="text"
              color="error"
              onClick={() => {
                setIsCancelSubscriptionModalOpen(true)
              }}
              sx={{
                width: 'fit-content',
              }}
            >
              Cancel Subscription
            </Button>
            <Button
              variant="contained"
              color="inherit"
              onClick={() => router.push('/subscriptions')}
              sx={{
                width: 'fit-content',
              }}
            >
              Change Plan
            </Button>
          </Box>
          <CancelSubscriptionModal
            isOpen={isCancelSubscriptionModalOpen}
            onClose={() => setIsCancelSubscriptionModalOpen(false)}
            onConfirm={() => {
              cancelSubscription()
              queryClient.invalidateQueries({
                queryKey: [
                  STRIPE_API_KEY.getCustomer(entityId),
                  STRIPE_API_KEY.getSubscription(subscriptionId ?? ''),
                ],
              })
              setIsCancelSubscriptionModalOpen(false)
            }}
          />
        </>
      )}
    </Box>
  )
}

const SubscriptionManagementWithElements: FC<SubscriptionManagementProps> = ({ entityId }) => (
  <Elements stripe={getStripePromise(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '')}>
    <SubscriptionManagement entityId={entityId} />
  </Elements>
)

export default SubscriptionManagementWithElements
