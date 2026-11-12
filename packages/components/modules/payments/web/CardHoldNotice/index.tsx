'use client'

import { FC } from 'react'

import { Alert } from '@mui/material'

import { getCardHoldNoticeMessage } from '../../common'
import { CardHoldNoticeProps } from './types'

/** Tells the customer what will happen to their card. It has no failure copy, by design. */
const CardHoldNotice: FC<CardHoldNoticeProps> = ({
  status,
  holdOn,
  chargeOn,
  formatDate,
  messages,
  severity = 'info',
  ...props
}) => (
  <Alert severity={severity} role="status" {...props}>
    {getCardHoldNoticeMessage(status, { holdOn, chargeOn, formatDate, messages })}
  </Alert>
)

export default CardHoldNotice
