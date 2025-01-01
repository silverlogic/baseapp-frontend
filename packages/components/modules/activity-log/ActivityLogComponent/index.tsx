'use client'

import { FC, useState, useTransition } from 'react'

import { Searchbar } from '@baseapp-frontend/design-system'

import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

import { ActivityLogsFragment$key } from '../../../__generated__/ActivityLogsFragment.graphql'
import SearchNotFoundState from '../../messages/SearchNotFoundState'
import DateRangeChip from '../DateRangeChip'
import EventFilterChip from '../EventFilterChip'
import LogGroups from '../LogGroups'
import { useActivityLogs } from '../graphql/queries/ActivityLogsFragment'
import { ActivityLogComponentProps } from './types'

const ActivityLogComponent: FC<ActivityLogComponentProps> = ({ queryRef }) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['All'])
  const { control, reset, watch } = useForm({ defaultValues: { search: '' } })
  const searchValue = watch('search')

  const [isPending, startTransition] = useTransition()
  const { logGroups, loadNext, hasNext, isLoadingNext, refetch } = useActivityLogs(
    queryRef as ActivityLogsFragment$key,
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || ''
    startTransition(() => {
      refetch({ userName: value, count: 10, cursor: null }, { fetchPolicy: 'store-and-network' })
    })
  }

  const handleSearchClear = () => {
    startTransition(() => {
      reset()
      refetch({ userName: '' })
    })
  }
  const emptyLogsList = logGroups.length === 0

  return (
    <Box p={2} justifyContent="center" minWidth="100%" display="flex" alignItems="center">
      <Box justifyContent="center" maxWidth={600} width="100%" mx="auto">
        <Typography component="h4" variant="h4" mb={4}>
          Activity Log
        </Typography>
        <Searchbar
          placeholder="Search by user"
          name="search"
          control={control}
          onChange={handleSearchChange}
          onClear={handleSearchClear}
          isPending={isPending}
        />
        <Box display="flex" mt={2} mb={2}>
          <DateRangeChip value={dateRange} onChange={setDateRange} />
          <EventFilterChip
            options={['All', 'Comments', 'Reactions', 'Posts']}
            selectedOptions={selectedFilters}
            onChange={setSelectedFilters}
          />
        </Box>
        {!isPending && searchValue && emptyLogsList && <SearchNotFoundState />}
        <LogGroups
          logGroups={logGroups}
          loadNext={loadNext}
          hasNext={hasNext}
          isLoadingNext={isLoadingNext}
        />
      </Box>
    </Box>
  )
}

export default ActivityLogComponent
