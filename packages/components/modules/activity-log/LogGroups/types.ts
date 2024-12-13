import { FC } from 'react'

import { VirtuosoProps } from 'react-virtuoso'

import { ActivityLogsFragment$key } from '../../../__generated__/ActivityLogsFragment.graphql'
import { LogItemProps } from '../LogItem/types'

export interface LogGroupsProps {
  activityLog: ActivityLogsFragment$key
  LogItem?: FC<LogItemProps>
  LogItemProps?: Partial<LogItemProps>
  LoadingState?: FC
  LoadingStateProps?: any
  VirtuosoProps?: Partial<VirtuosoProps<any, any>>
}

export interface LogGroup {
  lastActivityTimestamp: string
  logs: Log[]
}

export interface Log {
  id: string
  createdAt: string
  verb: string
  url: string | null
  user: {
    id: string
    fullName: string | null
    email: string | null
    avatar: {
      url: string
    } | null
  } | null
}
