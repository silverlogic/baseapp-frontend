import { FC } from 'react'

import { Text } from '@baseapp-frontend/design-system/components/native/typographies'

import { useIntl } from 'react-intl'

import { formatTimestamp } from '../../common'
import { TimestampProps } from './types'

const Timestamp: FC<TimestampProps> = ({ date }) => {
  const intl = useIntl()

  return (
    <Text variant="caption" color="low">
      {formatTimestamp(intl, date)}
    </Text>
  )
}

export default Timestamp
