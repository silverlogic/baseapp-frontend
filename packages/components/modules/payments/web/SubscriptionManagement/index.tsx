'use client'

import { FC, ReactNode, useEffect, useMemo, useState } from 'react'

import { useNotification } from '@baseapp-frontend/utils'

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
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FormattedMessage, useIntl } from 'react-intl'

import PaymentDropdown from '../PaymentDropDown'
import { PAYMENTS_MESSAGES, SUBSCRIPTIONS_URL } from '../constants'
import useStripeHook from '../hooks/useStripeHook'
import { STRIPE_API_KEY } from '../services/stripe'
import { getStripePromise } from '../utils/stripe'
import CancelSubscriptionModal from './CancelSubscriptionModal'
import FreePlanComponent from './FreePlanComponent'
import { SUBSCRIPTION_STATUS_MESSAGES } from './constants'
import {
  ColumnFlexContainer,
  PaymentMethodContainer,
  RowFlexContainer,
  SubscriptionPlanContainer,
} from './styled'
import { SubscriptionManagementProps } from './types'
import { getChipLabelAndColorByStatus } from './utils'

const renderBold = (chunks: ReactNode[]) => <strong>{chunks}</strong>

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
  // Invalidating at click time raced the in-flight DELETE, so the refetch could land
  // first and restore the still-active subscription into the cache.
  const invalidateAfterCancel = () => {
    invalidateCustomer()
    queryClient.invalidateQueries({
      queryKey: [STRIPE_API_KEY.getSubscription(subscriptionId ?? '')],
    })
  }

  const {
    useListPaymentMethods,
    useGetSubscription,
    useCancelSubscription,
    useUpdateSubscription,
    useGetCustomer,
  } = useStripeHook()
  const { data: customer, refetch: refetchCustomer } = useGetCustomer(entityId)
  const { data: subscription, isLoading: isLoadingSubscription } = useGetSubscription(
    subscriptionId ?? '',
  )
  const { data: paymentMethods, isLoading: isLoadingMethods } = useListPaymentMethods(entityId)
  const { mutate: cancelSubscription } = useCancelSubscription(
    subscription?.id ?? '',
    invalidateAfterCancel,
  )
  const { sendToast } = useNotification()
  const intl = useIntl()
  const elements = useElements()
  const stripe = useStripe()
  const searchParams = useSearchParams()
  const tabRedirect = searchParams.get('tab')
  const isLoading = isLoadingMethods || isLoadingSubscription
  const { mutateAsync: updateSubscription } = useUpdateSubscription(subscription?.id ?? '', {
    onSuccess: () => {
      invalidateCustomer()
      // One filter per key: a single queryKey holding two key arrays matches no query at all.
      queryClient.invalidateQueries({ queryKey: [STRIPE_API_KEY.listPaymentMethods()] })
      queryClient.invalidateQueries({
        queryKey: [STRIPE_API_KEY.getSubscription(subscriptionId ?? '')],
      })
      sendToast(intl.formatMessage(PAYMENTS_MESSAGES.subscriptionUpdated), { type: 'success' })
    },
    onError: (error) => {
      console.error('Error updating subscription:', error)
      sendToast(
        intl.formatMessage({
          id: 'payments.subscription.updatePaymentMethodFailed',
          defaultMessage: 'Failed to update payment method',
        }),
        { type: 'error' },
      )
    },
  })

  const amountDue = (subscription?.upcomingInvoice?.amountDue ?? 0) / 100
  const nextPaymentAttemptDate = subscription?.upcomingInvoice?.nextPaymentAttempt
  const nextPaymentAttempt = nextPaymentAttemptDate
    ? intl.formatDate(nextPaymentAttemptDate, { year: '2-digit', month: '2-digit', day: '2-digit' })
    : ''
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
  const statusMessage = SUBSCRIPTION_STATUS_MESSAGES[label]
  const statusLabel = statusMessage ? intl.formatMessage(statusMessage) : label

  const handleSetupSuccess = (paymentMethodId: string) => {
    if (paymentMethodId) {
      setLastAddedPaymentMethodIdDuringSession(paymentMethodId)
    }
  }

  const handleUpdateSubscription = (paymentMethodId: string) =>
    updateSubscription({
      defaultPaymentMethod: paymentMethodId,
    })

  useEffect(() => {
    if (lastAddedPaymentMethodIdDuringSession) {
      // An effect callback cannot be async, so the rejection is handled here rather
      // than left floating. This is the only caller, so one catch covers it.
      handleUpdateSubscription(lastAddedPaymentMethodIdDuringSession).catch((error) => {
        console.error('Error updating subscription:', error)
      })
    }
  }, [lastAddedPaymentMethodIdDuringSession])

  useEffect(() => {
    if (customer?.subscriptions?.[0]?.id) {
      // Setting the id flips the query's `enabled` guard, which fetches on its own. Refetching here
      // would run in the same tick with the previous (empty) id and request `/subscriptions/`.
      setSubscriptionId(customer.subscriptions[0].id)
    }
  }, [customer])

  useEffect(() => {
    if (!tabRedirect || tabRedirect !== 'subscription') return
    refetchCustomer()
  }, [tabRedirect])

  if (!hasSubscription && !isLoading) {
    return <FreePlanComponent planChangeUrl={SUBSCRIPTIONS_URL} />
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Typography variant="h4" component="h2">
        <FormattedMessage {...PAYMENTS_MESSAGES.subscription} />
      </Typography>
      {isLoading && <CircularProgress sx={{ margin: 'auto' }} />}
      {!isLoading && (
        <>
          <Card>
            <CardContent>
              <SubscriptionPlanContainer>
                <RowFlexContainer>
                  <Typography variant="h4" component="p">
                    {subscription?.product?.name ??
                      intl.formatMessage({
                        id: 'payments.subscription.planFallback',
                        defaultMessage: 'Subscription Plan',
                      })}
                  </Typography>
                  {label && color && <Chip label={statusLabel} color={color} variant="soft" />}
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
                  // Bleeds the rule out through the container's horizontal padding:
                  // the width has to grow by exactly what marginLeft pulls back, twice.
                  sx={(theme) => ({
                    width: `calc(100% + ${theme.spacing(6)})`,
                    marginLeft: -3,
                    marginY: 2,
                  })}
                />
              </SubscriptionPlanContainer>
              <PaymentMethodContainer>
                <ColumnFlexContainer>
                  <Typography variant="h6">
                    <FormattedMessage {...PAYMENTS_MESSAGES.payment} />
                  </Typography>
                  {nextPaymentAttempt && hasNextBill && (
                    <Typography variant="body2">
                      {amountDue !== 0 ? (
                        <FormattedMessage
                          id="payments.subscription.nextBill"
                          defaultMessage="Your next bill is for <b>{amount}</b> on <b>{date}</b>"
                          values={{
                            amount: intl.formatNumber(amountDue, {
                              style: 'currency',
                              currency: 'USD',
                            }),
                            date: nextPaymentAttempt,
                            b: renderBold,
                          }}
                        />
                      ) : (
                        <FormattedMessage
                          id="payments.subscription.nextBillFree"
                          defaultMessage="Your next bill is free on <b>{date}</b>"
                          values={{
                            date: nextPaymentAttempt,
                            b: renderBold,
                          }}
                        />
                      )}
                    </Typography>
                  )}
                </ColumnFlexContainer>
                {elements && stripe && (
                  <PaymentDropdown
                    handleSetupSuccess={handleSetupSuccess}
                    entityId={entityId}
                    paymentMethods={paymentMethods ?? []}
                    selectedPaymentMethodId={selectedPaymentMethodId ?? ''}
                    setSelectedPaymentMethodId={setLastAddedPaymentMethodIdDuringSession}
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
              <FormattedMessage {...PAYMENTS_MESSAGES.cancelSubscription} />
            </Button>
            <Button
              variant="contained"
              color="inherit"
              component={Link}
              href={SUBSCRIPTIONS_URL}
              sx={{
                width: 'fit-content',
              }}
            >
              <FormattedMessage {...PAYMENTS_MESSAGES.changePlan} />
            </Button>
          </Box>
          <CancelSubscriptionModal
            isOpen={isCancelSubscriptionModalOpen}
            onClose={() => setIsCancelSubscriptionModalOpen(false)}
            onConfirm={() => {
              cancelSubscription()
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
