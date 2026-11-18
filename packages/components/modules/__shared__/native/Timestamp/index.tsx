import { FC } from 'react'

import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { formatTimestamp } from '@baseapp-frontend/utils'

import { useIntl } from 'react-intl'

import { TimestampProps } from './types'

const Timestamp: FC<TimestampProps> = ({ date }) => {
  const intl = useIntl()

  return (
    <Text variant="caption" color="low">
      {formatTimestamp(date, { intl })}
    </Text>
  )
}

export default Timestamp
