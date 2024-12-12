import { FC } from 'react'

import { ActivityLogsFragment$key } from '../../../__generated__/ActivityLogsFragment.graphql'
import { LogItemProps } from '../LogItem/types'

export interface LogGroupsProps {
  activityLog: ActivityLogsFragment$key
  LogItem?: FC<LogItemProps>
  LogItemProps?: Partial<LogItemProps>
  LoadingState?: FC
  LoadingStateProps?: any
  VirtuosoProps?: any
  hasNext: boolean
  loadNext: (numEntries: number) => void
  isLoadingNext: boolean
}
