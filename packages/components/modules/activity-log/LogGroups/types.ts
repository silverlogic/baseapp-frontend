import { FC } from 'react'

import { LogGroup } from '../ActivityLog/types'
import { LogItemProps } from '../LogItem/types'

export interface LogGroupsProps {
  logGroups: LogGroup[]
  LogItem?: FC<LogItemProps>
  LogItemProps?: Partial<LogItemProps>
  LoadingState?: FC
  LoadingStateProps?: any
  VirtuosoProps?: any
  hasNext: boolean
  loadNext: (numEntries: number) => void
  isLoadingNext: boolean
}
