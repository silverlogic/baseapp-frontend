import { FC } from 'react'

import { AvatarDeletedUserIcon } from '@baseapp-frontend/design-system/components/web/icons'

import { Avatar, Box, CircularProgress, Typography } from '@mui/material'
import { Virtuoso } from 'react-virtuoso'

import { Timestamp } from '../../../../__shared__/web'
import { ActivityLogNode, LogGroup } from '../../../common'
import LogItem from '../LogItem'
import { LogGroupsProps } from './types'

const LogGroups: FC<LogGroupsProps> = ({
  LoadingState = CircularProgress,
  logGroups,
  LoadingStateProps,
  VirtuosoProps,
  loadNext,
  hasNext,
  isLoadingNext,
}) => {
  const renderLogItem = (log: ActivityLogNode, isLast: boolean) => {
    if (!log) return null

    return <LogItem key={log.id} sx={isLast ? { marginBottom: '6px' } : undefined} log={log} />
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
  const renderUserName = (group: LogGroup) => {
    if (group.logs[0]?.user == null) return 'Deleted User'
    return group.logs[0]?.user?.fullName
  }
  const renderAvatar = (group: LogGroup) => {
    if (group.logs[0]?.user == null) return <AvatarDeletedUserIcon />
    return (
      <Avatar
        style={{ marginBottom: '4px' }}
        sizes="small"
        src={group.logs[0]?.user?.avatar?.url ?? ''}
        alt={group.logs[0]?.user?.fullName ?? 'User activity log avatar'}
      />
    )
  }

  const renderItemContent = (group: LogGroup) => (
    <Box
      key={group.lastActivityTimestamp}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      pt="6px"
      pb="16px"
      maxWidth="568px"
    >
      <Box display="flex" alignItems="center" gap="12px">
        {renderAvatar(group)}
        <Typography variant="subtitle2" mb="6px">
          {renderUserName(group)}
        </Typography>
      </Box>
      {group.logs.map((log: ActivityLogNode, index: number) =>
        renderLogItem(log, index === group.logs.length - 1),
      )}
      <Timestamp date={group.lastActivityTimestamp} />
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
