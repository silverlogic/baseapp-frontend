'use client'

import { ChangeEvent, FC, useEffect, useState } from 'react'

import { TrashCanIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Box, IconButton, TextField, Typography } from '@mui/material'
import Image from 'next/image'

import { formatPrice } from '../../utils'
import { LINE_THUMBNAIL_SIZE, MAX_LINE_QUANTITY } from '../constants'
import { clampQuantity } from '../utils'
import { OrderLineRowProps } from './types'

const OrderLineRow: FC<OrderLineRowProps> = ({
  line,
  currency,
  disabled,
  onQuantityChange,
  onRemove,
}) => {
  const { product, quantity, unitAmount, amount } = line
  // The field keeps what is being typed (an empty box included) and commits a valid quantity
  // on blur, so clearing it to type a new number does not snap back to 1 mid-edit.
  const [draft, setDraft] = useState(String(quantity))

  useEffect(() => {
    setDraft(String(quantity))
  }, [quantity])

  const commit = () => {
    const next = clampQuantity(Number(draft))
    setDraft(String(next))
    if (next !== quantity) onQuantityChange(next)
  }

  return (
    <Box display="flex" alignItems="center" gap={2}>
      {!!product.images?.length && (
        <Box sx={{ display: 'flex', borderRadius: 1, overflow: 'hidden', flexShrink: 0 }}>
          <Image
            src={product.images[0] ?? ''}
            alt={product.name}
            width={LINE_THUMBNAIL_SIZE}
            height={LINE_THUMBNAIL_SIZE}
          />
        </Box>
      )}
      <Box flexGrow={1} minWidth={0}>
        <Typography variant="body2" fontWeight={700} noWrap>
          {product.name}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {formatPrice(unitAmount, undefined, currency)} each
        </Typography>
      </Box>
      <TextField
        size="small"
        type="number"
        value={draft}
        disabled={disabled}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === 'Enter') commit()
        }}
        inputProps={{
          min: 1,
          max: MAX_LINE_QUANTITY,
          step: 1,
          'aria-label': `Quantity of ${product.name}`,
        }}
        sx={{ width: 88 }}
      />
      <Typography variant="body2" fontWeight={700} minWidth={80} textAlign="right">
        {formatPrice(amount, undefined, currency)}
      </Typography>
      <IconButton
        size="small"
        aria-label={`Remove ${product.name}`}
        onClick={onRemove}
        disabled={disabled}
      >
        <TrashCanIcon sx={{ fontSize: 20 }} />
      </IconButton>
    </Box>
  )
}

export default OrderLineRow
