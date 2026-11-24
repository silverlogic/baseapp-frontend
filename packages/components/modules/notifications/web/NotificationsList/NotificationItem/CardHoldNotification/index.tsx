import { FC } from 'react'

import { formatRelativeTime } from '@baseapp-frontend/utils'

import { CardHoldStaffNotice as DefaultCardHoldStaffNotice } from '../../../../../payments/web'
import DefaultNotificationAvatar from '../Notification/NotificationAvatar'
import DefaultNotificationHeader from '../Notification/NotificationHeader'
import {
  NotificationContent as DefaultNotificationContent,
  NotificationRoot as DefaultNotificationRoot,
} from '../styled'
import { CardHoldNotificationProps } from './types'

/**
 * A card hold that needs staff (`PAYMENTS.CARD_HOLD_FAILED`, `PAYMENTS.CARD_HOLD_PARTIALLY_PAID`):
 * the backend's sentence, then the hold's staff notice with whatever can still be done about it.
 * Once the hold is settled the notice renders nothing and the sentence stays.
 */
const CardHoldNotification: FC<CardHoldNotificationProps> = ({
  notification,
  NotificationRoot = DefaultNotificationRoot,
  NotificationContent = DefaultNotificationContent,
  NotificationAvatar = DefaultNotificationAvatar,
  NotificationAvatarProps = {},
  NotificationHeader = DefaultNotificationHeader,
  NotificationHeaderProps = {},
  CardHoldStaffNotice = DefaultCardHoldStaffNotice,
  CardHoldStaffNoticeProps = {},
}) => {
  const { target } = notification
  // eslint-disable-next-line no-underscore-dangle
  const cardHold = target?.__typename === 'CardHold' ? target : null

  return (
    <NotificationRoot>
      <NotificationAvatar
        actorAvatar={notification.actor?.image ?? undefined}
        actorName={notification.actor?.name}
        {...NotificationAvatarProps}
      />
      <NotificationContent>
        <NotificationHeader
          message={notification.description ?? ''}
          timestamp={formatRelativeTime(notification.timestamp)}
          actorName={null}
          unread={notification.unread}
          {...NotificationHeaderProps}
        />
        {cardHold && <CardHoldStaffNotice cardHold={cardHold} {...CardHoldStaffNoticeProps} />}
      </NotificationContent>
    </NotificationRoot>
  )
}

export default CardHoldNotification
