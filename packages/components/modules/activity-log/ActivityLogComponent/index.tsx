'use client'

import { FC, useState } from 'react'

import { Box } from '@mui/material'

import { ActivityLogsFragment$key } from '../../../__generated__/ActivityLogsFragment.graphql'
import ActivityUserSearchBar from '../ActivityUserSearchBar'
import DateRangeChip from '../DateRangeChip'
import EventFilterChip from '../EventFilterChip'
import LogGroups from '../LogGroups'
import { useActivityLogs } from '../graphql/queries/ActivityLogsFragment'
import { ActivityLogComponentProps } from './types'

const ActivityLogComponent: FC<ActivityLogComponentProps> = ({ queryRef }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['All'])

  const { logGroups, loadNext, hasNext, isLoadingNext, refetch } = useActivityLogs(
    queryRef as ActivityLogsFragment$key,
  )

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    refetch({ count: 10, cursor: null })
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
