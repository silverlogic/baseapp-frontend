'use client'

import { FC, useMemo, useState } from 'react'

import { Box } from '@mui/material'
import { usePaginationFragment } from 'react-relay'

import { ActivityLogsFragment$key } from '../../../__generated__/ActivityLogsFragment.graphql'
import ActivityUserSearchBar from '../ActivityUserSearchBar'
import DateRangeChip from '../DateRangeChip'
import EventFilterChip from '../EventFilterChip'
import LogGroups from '../LogGroups'
import { Log, LogGroup } from '../LogGroups/types'
import { ActivityLogsFragmentQuery } from '../graphql/queries/ActivityLogsFragment'
import { ActivityLogComponentProps } from './types'

const ActivityLogComponent: FC<ActivityLogComponentProps> = ({ queryRef }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['All'])

  const { data, loadNext, hasNext, isLoadingNext, refetch } = usePaginationFragment(
    ActivityLogsFragmentQuery,
    queryRef as ActivityLogsFragment$key,
  )

  const logGroups = useMemo(() => {
    const groupedLogs: { [key: string]: LogGroup[] } = {}

    data?.activityLogs?.edges?.forEach((edge) => {
      const log = edge?.node as Log
      const userId = log?.user?.id as string
      const timestamp = new Date(log.createdAt).getTime()

      if (!groupedLogs[userId]) {
        groupedLogs[userId] = []
      }

      const lastGroup = groupedLogs[userId][groupedLogs[userId].length - 1]

      if (
        !lastGroup ||
        timestamp - new Date(lastGroup.lastActivityTimestamp).getTime() > 15 * 60 * 1000
      ) {
        groupedLogs[userId].push({
          lastActivityTimestamp: log.createdAt,
          logs: [log],
        })
      } else {
        lastGroup.logs.push(log)
        lastGroup.lastActivityTimestamp = log.createdAt
      }
    })

    const result: LogGroup[] = Object.values(groupedLogs).flat()
    result.sort(
      (a, b) =>
        new Date(b.lastActivityTimestamp).getTime() - new Date(a.lastActivityTimestamp).getTime(),
    )

    return result
  }, [data])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    refetch({ count: 10, cursor: null, searchTerm: e.target.value })
  }

  return (
    <Box p={2} justifyContent="center">
      <ActivityUserSearchBar value={searchTerm} onChange={handleSearch} />
      <Box display="flex" mt={2} mb={2}>
        <DateRangeChip value={dateRange} onChange={setDateRange} />
        <EventFilterChip
          options={['All', 'Comments', 'Reactions', 'Posts']}
          selectedOptions={selectedFilters}
          onChange={setSelectedFilters}
        />
      </Box>
      <LogGroups
        logGroups={logGroups}
        loadNext={loadNext}
        hasNext={hasNext}
        isLoadingNext={isLoadingNext}
      />
    </Box>
  )
}

export default ActivityLogComponent
