import { FC } from 'react'

import { Avatar, Box, CircularProgress, Typography } from '@mui/material'
import { Virtuoso } from 'react-virtuoso'

import { Log, LogGroup } from '../ActivityLog/types'
import DefaultLogItem from '../LogItem'
import { useActivityLogs } from '../hooks/useActivityLogs'
import { LogGroupsProps } from './types'

const LogGroups: FC<LogGroupsProps> = ({
  activityLog: activityLogRef,
  LogItem = DefaultLogItem,
  LogItemProps,
  LoadingState = CircularProgress,
  LoadingStateProps,
  VirtuosoProps,
  hasNext,
  loadNext,
  isLoadingNext,
}) => {
  const logGroups = useActivityLogs(activityLogRef)
  const renderLogItem = (log: any) => {
    if (!log) return null

    return <LogItem key={log.id} log={log} {...LogItemProps} />
  }

  const renderLoadingState = () => {
    if (!isLoadingNext) return <Box sx={{ paddingTop: 3 }} />

    return (
      <LoadingState
        sx={{ paddingTop: 3, paddingBottom: 1 }}
        CircularProgressProps={{ size: 15 }}
        aria-label="loading more activity logs"
        {...LoadingStateProps}
      />
    )
  }

  const renderItemContent = (group: LogGroup) => (
    <Box key={group.lastActivityTimestamp} gap="12px">
      <Box display="flex" gap="12px">
        <Avatar
          sizes="small"
          src={group.logs[0]?.user?.avatar?.url ?? ''}
          alt={group.logs[0]?.user?.fullName ?? ''}
        />
        <Typography variant="subtitle2">{group.logs[0]?.user?.fullName}</Typography>
      </Box>
      {group.logs.map((log: Log) => renderLogItem(log))}
      <Typography variant="caption">
        {new Date(group.lastActivityTimestamp).toLocaleString()}
      </Typography>
    </Box>
  )

  return (
    <div className="overflow-x-auto hide-scrollbar">
      <Virtuoso
        useWindowScroll
        data={logGroups}
        itemContent={(_index, group) => renderItemContent(group)}
        components={{
          Footer: renderLoadingState,
        }}
        endReached={() => {
          if (hasNext) {
            loadNext(10)
          }
        }}
        {...VirtuosoProps}
      />
    </div>
  )
}

export default LogGroups
