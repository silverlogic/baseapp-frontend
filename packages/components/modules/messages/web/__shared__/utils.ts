import { IntlShape } from 'react-intl'

import { SHARED_MESSAGES } from './constants'

export const getParticipantCountLabel = (
  intl: IntlShape,
  participantCount: number | null | undefined,
) =>
  participantCount === undefined || participantCount === null
    ? undefined
    : intl.formatMessage(SHARED_MESSAGES.memberCount, { count: participantCount })
