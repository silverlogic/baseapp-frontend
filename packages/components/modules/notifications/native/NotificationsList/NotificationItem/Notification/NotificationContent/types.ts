import { FC, PropsWithChildren } from 'react'

import NotificationBody from './NotificationBody'
import NotificationHeader from './NotificationHeader'

export interface NotificationContentProps extends FC<PropsWithChildren> {
  Header: typeof NotificationHeader
  Body: typeof NotificationBody
}
