import { FC } from 'react'

import { ActivityLogsFragment$key } from '../../../__generated__/ActivityLogsFragment.graphql'
import { LogItemProps } from '../LogItem/types'

export interface ActivityLogProps {
  activityLog: ActivityLogsFragment$key
  LogItem?: FC<LogItemProps>
  LogItemProps?: Partial<LogItemProps>
  LoadingState?: FC
  LoadingStateProps?: any
  VirtuosoProps?: any
}

export interface LogGroup {
  lastActivityTimestamp: string
  logs: Log[]
}

export interface Log {
  id?: string
  createdAt: string
  verb?: string
  url?: string
  user?: {
    id?: string
    fullName?: string
    email?: string
    avatar?: {
      url?: string
    }
  }
}
