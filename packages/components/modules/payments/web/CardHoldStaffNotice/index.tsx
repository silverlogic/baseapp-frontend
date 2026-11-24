'use client'

import { FC, useMemo, useState } from 'react'

import { ConfirmDialog } from '@baseapp-frontend/design-system/components/web/dialogs'

import { LoadingButton } from '@mui/lab'
import { Alert, AlertTitle, Button, Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import { useFragment } from 'react-relay'

import {
  CARD_HOLD_PAYMENT_STATUS,
  CARD_HOLD_STATUS,
  CardHoldStaffNoticeFragmentQuery,
  useCardHoldCancelMutation,
  useCardHoldKeepMutation,
  useCardHoldMarkPaidMutation,
  useCardHoldRetryMutation,
} from '../../common'
import { CARD_HOLD_STAFF_DECISION_DIALOGS, CARD_HOLD_STAFF_NOTICE_MESSAGES } from './constants'
import { CardHoldStaffNoticeBody, CardHoldStaffNoticeButtons } from './styled'
import {
  CardHoldStaffDecision,
  CardHoldStaffNoticeMessages,
  CardHoldStaffNoticeProps,
} from './types'

/**
 * Tells staff that a hold needs them, and offers what they can do about it. The customer is never
 * told: this renders nothing unless `canDecide` is true, which the backend sets only for a viewer
 * granted `change_cardhold` (every one of these mutations needs it).
 *
 * - A failed hold: an error notice with Stripe's failure code and Keep / Cancel (plus Retry while
 *   `retriesLeft` allows). Once kept it turns into an info notice with no actions, and it goes
 *   once the hold is paid (a kept failed hold that was then charged stays `failed`).
 * - A partially paid hold: a warning notice with Mark paid.
 *
 * Every action goes through a confirmation. Renders nothing for any other hold.
 */
const CardHoldStaffNotice: FC<CardHoldStaffNoticeProps> = ({
  cardHold: cardHoldRef,
  onDecided,
  messages: customMessages,
}) => {
  const cardHold = useFragment(CardHoldStaffNoticeFragmentQuery, cardHoldRef)
  const intl = useIntl()
  const messages = useMemo(() => {
    const { retriesLeft, ...plain } = CARD_HOLD_STAFF_NOTICE_MESSAGES
    const defaults = Object.fromEntries(
      Object.entries(plain).map(([key, descriptor]) => [key, intl.formatMessage(descriptor)]),
    ) as Omit<CardHoldStaffNoticeMessages, 'retriesLeft'>
    return {
      ...defaults,
      retriesLeft: (count: number) => intl.formatMessage(retriesLeft, { count }),
      ...customMessages,
    } as CardHoldStaffNoticeMessages
  }, [intl, customMessages])
  // Kept apart from `isDialogOpen` so the dialog keeps its copy while it animates closed.
  const [decision, setDecision] = useState<CardHoldStaffDecision>('keep')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [commitKeep, isKeepInFlight] = useCardHoldKeepMutation()
  const [commitCancel, isCancelInFlight] = useCardHoldCancelMutation()
  const [commitRetry, isRetryInFlight] = useCardHoldRetryMutation()
  const [commitMarkPaid, isMarkPaidInFlight] = useCardHoldMarkPaidMutation()
  const isInFlight = isKeepInFlight || isCancelInFlight || isRetryInFlight || isMarkPaidInFlight

  // A kept failed hold stays `failed` after it is charged: once paid, nothing is left to decide.
  const isFailed =
    cardHold.status === CARD_HOLD_STATUS.failed &&
    cardHold.paymentStatus !== CARD_HOLD_PAYMENT_STATUS.paid
  const isPartiallyPaid = cardHold.paymentStatus === CARD_HOLD_PAYMENT_STATUS.partiallyPaid
  if (!cardHold.canDecide || (!isFailed && !isPartiallyPaid)) return null

  const { retriesLeft } = cardHold
  const canRetry = retriesLeft != null && retriesLeft > 0

  const openDialog = (next: CardHoldStaffDecision) => {
    setDecision(next)
    setIsDialogOpen(true)
  }

  const closeDialog = () => {
    if (!isInFlight) setIsDialogOpen(false)
  }

  const handleConfirm = () => {
    if (!isDialogOpen) return
    const variables = { input: { id: cardHold.id } }
    // A missing or forbidden id, or a hold the action doesn't apply to, comes back as a
    // GraphQL error (`errors`, with a null payload), not in the payload's `errors`.
    const onCompleted = (
      payload:
        | {
            readonly cardHold?: unknown
            readonly errors?: ReadonlyArray<unknown> | null
          }
        | null
        | undefined,
      errors: ReadonlyArray<unknown> | null | undefined,
    ) => {
      setIsDialogOpen(false)
      if (payload?.cardHold && !payload.errors?.length && !errors?.length) onDecided?.(decision)
    }
    const onError = () => setIsDialogOpen(false)

    switch (decision) {
      case 'keep':
        commitKeep({
          variables,
          onCompleted: (response, errors) => onCompleted(response?.cardHoldKeep, errors),
          onError,
        })
        break
      case 'cancel':
        commitCancel({
          variables,
          onCompleted: (response, errors) => onCompleted(response?.cardHoldCancel, errors),
          onError,
        })
        break
      case 'retry':
        commitRetry({
          variables,
          onCompleted: (response, errors) => onCompleted(response?.cardHoldRetry, errors),
          onError,
        })
        break
      case 'markPaid':
        commitMarkPaid({
          variables,
          onCompleted: (response, errors) => onCompleted(response?.cardHoldMarkPaid, errors),
          onError,
        })
        break
      default:
        break
    }
  }

  const dialog = CARD_HOLD_STAFF_DECISION_DIALOGS[decision]

  return (
    <>
      <ConfirmDialog
        open={isDialogOpen}
        onClose={closeDialog}
        title={messages[dialog.title]}
        content={messages[dialog.content]}
        cancelText={messages.dismiss}
        action={
          <LoadingButton
            color={dialog.color}
            onClick={handleConfirm}
            disabled={isInFlight}
            loading={isInFlight}
          >
            {messages[dialog.confirm]}
          </LoadingButton>
        }
      />
      {isFailed && (
        <Alert severity={cardHold.kept ? 'info' : 'error'}>
          <AlertTitle>{messages.failureTitle}</AlertTitle>
          <CardHoldStaffNoticeBody>
            <Typography variant="body2">
              {cardHold.failureReason || messages.unknownReason}
            </Typography>
            {cardHold.kept ? (
              <Typography variant="body2">{messages.keptNotice}</Typography>
            ) : (
              <>
                <CardHoldStaffNoticeButtons>
                  <Button
                    variant="outlined"
                    onClick={() => openDialog('keep')}
                    disabled={isInFlight}
                  >
                    {messages.keepButton}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => openDialog('cancel')}
                    disabled={isInFlight}
                  >
                    {messages.cancelButton}
                  </Button>
                  {canRetry && (
                    <Button
                      variant="outlined"
                      onClick={() => openDialog('retry')}
                      disabled={isInFlight}
                    >
                      {messages.retryButton}
                    </Button>
                  )}
                </CardHoldStaffNoticeButtons>
                {retriesLeft != null && (
                  <Typography variant="caption">
                    {canRetry ? messages.retriesLeft(retriesLeft) : messages.noRetriesLeft}
                  </Typography>
                )}
              </>
            )}
          </CardHoldStaffNoticeBody>
        </Alert>
      )}
      {isPartiallyPaid && (
        <Alert severity="warning">
          <AlertTitle>{messages.partiallyPaidTitle}</AlertTitle>
          <CardHoldStaffNoticeBody>
            <Typography variant="body2">{messages.partiallyPaidNotice}</Typography>
            <CardHoldStaffNoticeButtons>
              <Button
                variant="outlined"
                onClick={() => openDialog('markPaid')}
                disabled={isInFlight}
              >
                {messages.markPaidButton}
              </Button>
            </CardHoldStaffNoticeButtons>
          </CardHoldStaffNoticeBody>
        </Alert>
      )}
    </>
  )
}

export default CardHoldStaffNotice
