import { FC } from 'react'

import { CircularProgress } from '@mui/material'

import LogGroups from '../LogGroups'
import DefaultLogItem from '../LogItem'
import { ActivityLogProps } from './types'

const ActivityLog: FC<ActivityLogProps> = ({
  activityLog: activityLogRef,
  LogItem = DefaultLogItem,
  LogItemProps,
  LoadingState = CircularProgress,
  LoadingStateProps,
  VirtuosoProps,
}) => {
  return (
    <LogGroups
      activityLog={activityLogRef}
      LogItem={LogItem}
      LogItemProps={LogItemProps}
      LoadingState={LoadingState}
      LoadingStateProps={LoadingStateProps}
      VirtuosoProps={VirtuosoProps}
      hasNext={false}
      loadNext={() => {}}
      isLoadingNext={false}
    />
  )
}

export default ActivityLog
