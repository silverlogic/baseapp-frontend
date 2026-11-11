'use client'

import { FC } from 'react'

import { Chip } from '@mui/material'
import { useFragment } from 'react-relay'

import { CardHoldStatusLabelFragmentQuery, getCardHoldStatusLabel } from '../../common'
import { CardHoldStatusLabelProps } from './types'

const CardHoldStatusLabel: FC<CardHoldStatusLabelProps> = ({
  cardHold: cardHoldRef,
  view = 'customer',
  getLabel = getCardHoldStatusLabel,
  size = 'small',
  ...props
}) => {
  const cardHold = useFragment(CardHoldStatusLabelFragmentQuery, cardHoldRef)
  const { label, color } = getLabel(cardHold.status, { kept: cardHold.kept, view })
  return <Chip label={label} color={color} size={size} {...props} />
}

export default CardHoldStatusLabel
