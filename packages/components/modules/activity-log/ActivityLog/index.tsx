import { FC } from 'react'

import { CircularProgress } from '@mui/material'

import LogGroups from '../LogGroups'
import DefaultLogItem from '../LogItem'
import { useActivityLogs } from '../hooks/useActivityLogs'
import { ActivityLogProps } from './types'

const ActivityLog: FC<ActivityLogProps> = ({
  activityLog: activityLogRef,
  LogItem = DefaultLogItem,
  LogItemProps,
  LoadingState = CircularProgress,
  LoadingStateProps,
  VirtuosoProps,
}) => {
  const logGroups = useActivityLogs(activityLogRef)

  return (
    <LogGroups
      logGroups={logGroups}
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
