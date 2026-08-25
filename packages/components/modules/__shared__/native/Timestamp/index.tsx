import { FC } from 'react'

import { Text } from '@baseapp-frontend/design-system/components/native/typographies'
import { DATE_FORMAT, formatDate } from '@baseapp-frontend/utils'

import { DateTime } from 'luxon'

import { TimestampProps } from './types'

const Timestamp: FC<TimestampProps> = ({ date }) => {
  const dateTime = DateTime.fromISO(date)
  const now = DateTime.now()
  const diffDays = now.startOf('day').diff(dateTime.startOf('day'), 'days').days

  let text
  if (diffDays === 0) text = 'Today'
  else if (diffDays === 1) text = 'Yesterday'
  else if (diffDays <= 7) text = `${diffDays} days ago`
  // TODO (Design): Can we reuse formatDateWithDiffNow or formatRelativeTeam?
  // The text would then be slightly different, but more consistent.
  else text = formatDate(dateTime, { toFormat: DATE_FORMAT[2] })

  return (
    <Text variant="caption" color="low">
      {text}
    </Text>
  )
}

export default Timestamp
