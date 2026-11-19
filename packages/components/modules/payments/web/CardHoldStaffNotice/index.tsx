'use client'

import { FC, useState } from 'react'

import { ConfirmDialog } from '@baseapp-frontend/design-system/components/web/dialogs'

import { LoadingButton } from '@mui/lab'
import { Alert, AlertTitle, Button, Typography } from '@mui/material'
import { useFragment } from 'react-relay'

import {
  CARD_HOLD_STATUS,
  CardHoldStaffNoticeFragmentQuery,
  useCardHoldCancelMutation,
  useCardHoldKeepMutation,
} from '../../common'
import { DEFAULT_CARD_HOLD_STAFF_NOTICE_MESSAGES } from './constants'
import { CardHoldStaffNoticeBody, CardHoldStaffNoticeButtons } from './styled'
import { CardHoldStaffDecision, CardHoldStaffNoticeProps } from './types'

/**
 * Tells staff that a deferred hold failed, and offers what they can do about it: an error notice
 * with Stripe's failure code and Keep / Cancel behind a confirmation, which turns into an info
 * notice with no actions once kept. Renders nothing for a hold that didn't fail; `status` is only
 * `failed` for a viewer granted `view_cardhold` (customers read it as `scheduled`), and the
 * mutations need `change_cardhold`.
 */
const CardHoldStaffNotice: FC<CardHoldStaffNoticeProps> = ({
  cardHold: cardHoldRef,
  onDecided,
  messages: customMessages,
}) => {
  const cardHold = useFragment(CardHoldStaffNoticeFragmentQuery, cardHoldRef)
  const messages = { ...DEFAULT_CARD_HOLD_STAFF_NOTICE_MESSAGES, ...customMessages }
  const [decision, setDecision] = useState<CardHoldStaffDecision | null>(null)
  const [commitKeep, isKeepInFlight] = useCardHoldKeepMutation()
  const [commitCancel, isCancelInFlight] = useCardHoldCancelMutation()
  const isInFlight = isKeepInFlight || isCancelInFlight

  if (cardHold.status !== CARD_HOLD_STATUS.failed) return null

  const closeDialog = () => {
    if (!isInFlight) setDecision(null)
  }

  const handleConfirm = () => {
    if (!decision) return
    const variables = { input: { id: cardHold.id } }
    // A missing or forbidden id, an already-decided hold or one that isn't failed comes back
    // as a GraphQL error (`errors`, with a null payload), not in the payload's `errors`.
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
      setDecision(null)
      if (payload?.cardHold && !payload.errors?.length && !errors?.length) onDecided?.(decision)
    }
    if (decision === 'keep') {
      commitKeep({
        variables,
        onCompleted: (response, errors) => onCompleted(response?.cardHoldKeep, errors),
        onError: () => setDecision(null),
      })
    } else {
      commitCancel({
        variables,
        onCompleted: (response, errors) => onCompleted(response?.cardHoldCancel, errors),
        onError: () => setDecision(null),
      })
    }
  }

  const isKeep = decision === 'keep'

  return (
    <>
      <ConfirmDialog
        open={decision !== null}
        onClose={closeDialog}
        title={isKeep ? messages.keepTitle : messages.cancelTitle}
        content={isKeep ? messages.keepContent : messages.cancelContent}
        cancelText={messages.dismiss}
        action={
          <LoadingButton
            color={isKeep ? 'primary' : 'error'}
            onClick={handleConfirm}
            disabled={isInFlight}
            loading={isInFlight}
          >
            {isKeep ? messages.keepConfirm : messages.cancelConfirm}
          </LoadingButton>
        }
      />
      <Alert severity={cardHold.kept ? 'info' : 'error'}>
        <AlertTitle>{messages.failureTitle}</AlertTitle>
        <CardHoldStaffNoticeBody>
          <Typography variant="body2">
            {cardHold.failureReason || messages.unknownReason}
          </Typography>
          {cardHold.kept ? (
            <Typography variant="body2">{messages.keptNotice}</Typography>
          ) : (
            <CardHoldStaffNoticeButtons>
              <Button variant="outlined" onClick={() => setDecision('keep')} disabled={isInFlight}>
                {messages.keepButton}
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setDecision('cancel')}
                disabled={isInFlight}
              >
                {messages.cancelButton}
              </Button>
            </CardHoldStaffNoticeButtons>
          )}
        </CardHoldStaffNoticeBody>
      </Alert>
    </>
  )
}

export default CardHoldStaffNotice
