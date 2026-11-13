import type { IntlShape } from 'react-intl'

import { UPDATE_MESSAGES } from './constants'

export const getUpdateMessage = (
  verb: string,
  diff: Record<string, any>,
  intl: IntlShape,
): string => {
  const baseMessage = intl.formatMessage(UPDATE_MESSAGES.updated, { name: verb.split('.')[0] })

  if (!diff) {
    return baseMessage
  }

  const updateMessages: string[] = Object.keys(diff).map((key) => {
    switch (key) {
      case 'image':
        return intl.formatMessage(UPDATE_MESSAGES.profilePicture)
      case 'banner_image':
        return intl.formatMessage(UPDATE_MESSAGES.profileBanner)
      case 'biography':
        return intl.formatMessage(UPDATE_MESSAGES.bio)
      default:
        return intl.formatMessage(UPDATE_MESSAGES.updated, { name: key.replace('_', ' ') })
    }
  })

  return updateMessages.length > 0 ? updateMessages.join(', ') : baseMessage
}
