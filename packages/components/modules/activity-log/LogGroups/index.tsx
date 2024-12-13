import { FC } from 'react'

import { Avatar, Box, CircularProgress, Typography } from '@mui/material'
import { Virtuoso } from 'react-virtuoso'

import DefaultLogItem from '../LogItem'
import { useActivityLogs } from '../hooks/useActivityLogs'
import { Log, LogGroup, LogGroupsProps } from './types'

const LogGroups: FC<LogGroupsProps> = ({
  activityLog: activityLogRef,
  LogItem = DefaultLogItem,
  LogItemProps,
  LoadingState = CircularProgress,
  LoadingStateProps,
  VirtuosoProps,
}) => {
  const { logGroups, loadNext, hasNext, isLoadingNext } = useActivityLogs(activityLogRef)
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
    <Box
      key={group.lastActivityTimestamp}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap="12px"
      pt="6px"
      pb="16px"
      maxWidth="568px"
    >
      <Box display="flex" alignItems="center" gap="12px">
        <Avatar
          sizes="small"
          src={group.logs[0]?.user?.avatar?.url ?? ''}
          alt={group.logs[0]?.user?.fullName ?? ''}
        />
        <Typography variant="subtitle2" mb="6px">
          {group.logs[0]?.user?.fullName}
        </Typography>
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
