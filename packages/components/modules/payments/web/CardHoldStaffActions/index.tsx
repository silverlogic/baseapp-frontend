'use client'

import { FC, useState } from 'react'

import { ConfirmDialog } from '@baseapp-frontend/design-system/components/web/dialogs'

import { LoadingButton } from '@mui/lab'
import { Button, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import {
  CARD_HOLD_PAYMENT_STATUS,
  CARD_HOLD_STATUS,
  CardHoldStaffActionsFragmentQuery,
  useCardHoldCancelMutation,
  useCardHoldKeepMutation,
  useCardHoldMarkPaidMutation,
  useCardHoldRetryMutation,
} from '../../common'
import {
  CARD_HOLD_STAFF_DECISION_DIALOGS,
  DEFAULT_CARD_HOLD_STAFF_ACTIONS_MESSAGES,
} from './constants'
import { CardHoldStaffActionsButtons, CardHoldStaffActionsContainer } from './styled'
import { CardHoldStaffActionsProps, CardHoldStaffDecision } from './types'

/**
 * Staff view of a hold that needs a decision. A failed deferred hold shows Stripe's failure
 * code, and Keep / Cancel (plus Retry while `retriesLeft` allows) behind a confirmation, until it
 * is paid (a kept failed hold that was then charged stays `failed`); a partially paid one offers Mark paid. Renders nothing otherwise, and nothing at all unless
 * `canDecide` is true: the backend sets it only for a viewer granted `change_cardhold`, which
 * every one of these mutations needs.
 */
const CardHoldStaffActions: FC<CardHoldStaffActionsProps> = ({
  cardHold: cardHoldRef,
  onDecided,
  messages: customMessages,
}) => {
  const cardHold = useFragment(CardHoldStaffActionsFragmentQuery, cardHoldRef)
  const messages = { ...DEFAULT_CARD_HOLD_STAFF_ACTIONS_MESSAGES, ...customMessages }
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
        <CardHoldStaffActionsContainer>
          <Typography variant="subtitle2">{messages.failureTitle}</Typography>
          <Typography variant="body2" color="text.secondary">
            {cardHold.failureReason || messages.unknownReason}
          </Typography>
          {cardHold.kept ? (
            <Typography variant="body2">{messages.keptNotice}</Typography>
          ) : (
            <>
              <CardHoldStaffActionsButtons>
                <Button variant="outlined" onClick={() => openDialog('keep')} disabled={isInFlight}>
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
              </CardHoldStaffActionsButtons>
              {retriesLeft != null && (
                <Typography variant="body2" color="text.secondary">
                  {canRetry ? messages.retriesLeft(retriesLeft) : messages.noRetriesLeft}
                </Typography>
              )}
            </>
          )}
        </CardHoldStaffActionsContainer>
      )}
      {isPartiallyPaid && (
        <CardHoldStaffActionsContainer>
          <Typography variant="subtitle2">{messages.partiallyPaidTitle}</Typography>
          <Typography variant="body2" color="text.secondary">
            {messages.partiallyPaidNotice}
          </Typography>
          <CardHoldStaffActionsButtons>
            <Button variant="outlined" onClick={() => openDialog('markPaid')} disabled={isInFlight}>
              {messages.markPaidButton}
            </Button>
          </CardHoldStaffActionsButtons>
        </CardHoldStaffActionsContainer>
      )}
    </>
  )
}

export default CardHoldStaffActions
