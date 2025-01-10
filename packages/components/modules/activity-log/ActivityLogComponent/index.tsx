'use client'

import { ChangeEventHandler, FC, useState, useTransition } from 'react'

import { Searchbar } from '@baseapp-frontend/design-system'

import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

import SearchNotFoundState from '../../__shared__/SearchNotFoundState'
import { useActivityLogs } from '../graphql/queries/ActivityLogsFragment'
import EventFilterChip from './EventFilterChip'
import DefaultLogGroups from './LogGroups'
import { ActivityLogComponentProps, EventFilterOption } from './types'

const ActivityLogComponent: FC<ActivityLogComponentProps> = ({
  queryRef,
  LogGroups = DefaultLogGroups,
  LogGroupsProps,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<EventFilterOption[]>(['All'])
  const [isPending] = useTransition()
  const { control, watch } = useForm({ defaultValues: { search: '' } })
  const searchValue = watch('search')
  const { logGroups, loadNext, hasNext, isLoadingNext } = useActivityLogs(queryRef)
  // TODO: use startTransition from useTransition when triggering a refetch
  const handleSearchChange: ChangeEventHandler<HTMLInputElement> = () => {}
  const handleSearchClear = () => {}
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
          {...LogGroupsProps}
        />
      </Box>
    </Box>
  )
}
export default ActivityLogComponent
