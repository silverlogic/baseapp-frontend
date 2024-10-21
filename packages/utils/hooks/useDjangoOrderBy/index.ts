'use client'

import { useState } from 'react'

import { decamelize } from 'humps'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'

import { DESCENDING_ORDER_PREFIX } from '../../constants/django'
import { joinWithSeparator } from '../../functions/string/joinWithSeparator'
import { OrderingDirection } from '../../types/django'
import { DjangoOrderByOptions } from './types'

const useDjangoOrderBy = <OrderPair extends Record<string, OrderingDirection>>({
  defaultPairs,
  descendingOrderPrefix = DESCENDING_ORDER_PREFIX,
}: DjangoOrderByOptions<OrderPair>) => {
  const [orderingPairs, setOrderingPairs] = useState(defaultPairs)

  const togglePairOrder = (order: OrderingDirection) => (order === 'asc' ? 'desc' : 'asc')

  const handleOrderBy = (fields: (keyof OrderPair)[]) => {
    fields.forEach((field) => {
      setOrderingPairs((prevOrderingPairs) => {
        const previousPairMatch = prevOrderingPairs[field] as OrderingDirection
        return {
          ...prevOrderingPairs,
          [field]: togglePairOrder(previousPairMatch),
        }
      })
    })
  }

  const formatPairToString = () => {
    if (isEmpty(orderingPairs)) return undefined

    const currentFieldsWithOrder = map(orderingPairs, (order, field) => {
      const formattedField = decamelize(field)
      const formattedOrder = order === 'desc' ? descendingOrderPrefix : ''

      return `${formattedOrder}${formattedField}`
    })

    return joinWithSeparator(currentFieldsWithOrder, { separator: ',' })
  }

  return {
    orderBy: formatPairToString(),
    handleOrderBy,
  }
}

export default useDjangoOrderBy
