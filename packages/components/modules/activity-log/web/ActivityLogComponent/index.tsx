'use client'

import { type ChangeEvent, type FC, useState, useTransition } from 'react'

import { Searchbar } from '@baseapp-frontend/design-system/components/web/inputs'

import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

import { SearchNotFoundState } from '../../../__shared__/web'
import DateFilterChip from '../DateFilterChip'
import { IFetchParameters } from '../DateFilterComponent/types'
import { useActivityLogs } from '../../common'
import EventFilterChip from './EventFilterChip'
import DefaultLogGroups from './LogGroups'
import { ActivityLogComponentProps, EventFilterOption } from './types'

const ActivityLogComponent: FC<ActivityLogComponentProps> = ({
  queryRef,
  LogGroups = DefaultLogGroups,
  LogGroupsProps,
}) => {
  const [fetchParameters, setFetchParameters] = useState<IFetchParameters>({
    createdFrom: null,
    createdTo: null,
    userName: '',
    count: 10,
    cursor: null,
  })
  const { logGroups, loadNext, hasNext, isLoadingNext, refetch } = useActivityLogs(queryRef)
  const [isPending, startTransition] = useTransition()
  const [selectedFilters, setSelectedFilters] = useState<EventFilterOption[]>(['All'])
  const { control, reset, watch } = useForm({ defaultValues: { search: '' } })
  const searchValue = watch('search')

  const executeRefetch = (updatedParameters: Partial<IFetchParameters>) => {
    const newFetchParameters = { ...fetchParameters, ...updatedParameters }
    setFetchParameters(newFetchParameters)
    startTransition(() => {
      refetch(newFetchParameters, { fetchPolicy: 'store-and-network' })
    })
  }

  const handleSearchClear = () => {
    startTransition(() => {
      reset()
      executeRefetch({ userName: '' })
    })
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || ''
    startTransition(() => {
      executeRefetch({ userName: value })
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
        <Box display="flex" mt={2} mb={2} flexDirection="row" gap={2}>
          <DateFilterChip fetchParameters={fetchParameters} executeRefetch={executeRefetch} />
          <EventFilterChip
            options={['All', 'Comments', 'Reactions', 'Posts']}
            selectedOptions={selectedFilters}
            onChange={setSelectedFilters}
          />
        </Box>
        {!isPending && searchValue && emptyLogsList && <SearchNotFoundState />}
        {!isPending &&
          (fetchParameters.createdFrom != null || fetchParameters.createdTo != null) &&
          emptyLogsList && (
            <SearchNotFoundState message="No results found for the selected date range." />
          )}
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
