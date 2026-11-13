import React, { FC, useState } from 'react'

import { Box, Button } from '@mui/material'
import { DateValidationError, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { DateTime } from 'luxon'
import { useIntl } from 'react-intl'

import { DateFilterComponentProps } from './types'

const DateFilterComponent: FC<DateFilterComponentProps> = ({
  createdFrom,
  createdTo,
  executeRefetch,
  onApply,
  onClearFilter,
}) => {
  const intl = useIntl()
  const [tempCreatedFrom, setTempCreatedFrom] = useState<DateTime | null>(createdFrom ?? null)
  const [tempCreatedTo, setTempCreatedTo] = useState<DateTime | null>(createdTo ?? null)

  const [error, setError] = useState<DateValidationError | null>(null)

  const errorMessage = React.useMemo(() => {
    switch (error) {
      case 'minDate':
        return intl.formatMessage({
          id: 'activityLog.dateFilter.error.minDate',
          defaultMessage: 'End date cannot be earlier than start date.',
        })
      case 'invalidDate':
        return intl.formatMessage({
          id: 'activityLog.dateFilter.error.invalidDate',
          defaultMessage: 'Your date is not valid',
        })
      default:
        return ''
    }
  }, [error, intl])

  const handleApply = () => {
    if (tempCreatedTo && tempCreatedFrom && tempCreatedTo < tempCreatedFrom) {
      setError('minDate')
      return
    }

    setError(null)
    executeRefetch({
      createdFrom: tempCreatedFrom ? tempCreatedFrom.toISODate() : null,
      createdTo: tempCreatedTo ? tempCreatedTo.toISODate() : null,
    })
    onApply?.()
  }

  const handleClear = () => {
    if (createdFrom || createdTo) {
      executeRefetch({
        createdFrom: null,
        createdTo: null,
      })
    }
    setTempCreatedFrom(null)
    setTempCreatedTo(null)
    onClearFilter?.()
  }

  const disableStartDate = (date: DateTime) => (tempCreatedTo ? date > tempCreatedTo : false)

  const disableEndDate = (date: DateTime) => (tempCreatedFrom ? date < tempCreatedFrom : false)

  return (
    <Box display="flex" gap={2} flexDirection="column">
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <DatePicker
          label={intl.formatMessage({
            id: 'activityLog.dateFilter.startDate',
            defaultMessage: 'Start date',
          })}
          onChange={(newValue) => setTempCreatedFrom(newValue)}
          disableFuture
          value={tempCreatedFrom}
          shouldDisableDate={disableStartDate}
          slotProps={{
            day: (dayProps) => ({
              sx: {
                ...(disableStartDate(dayProps.day) && {
                  backgroundColor: 'error.lighter',
                }),
              },
            }),
          }}
        />
        <DatePicker
          label={intl.formatMessage({
            id: 'activityLog.dateFilter.endDate',
            defaultMessage: 'End date',
          })}
          value={tempCreatedTo}
          onChange={(newValue) => setTempCreatedTo(newValue)}
          onError={(newError) => setError(newError)}
          disableFuture
          shouldDisableDate={disableEndDate}
          slotProps={{
            textField: {
              helperText: errorMessage,
            },
            day: (dayProps) => ({
              sx: {
                ...(disableEndDate(dayProps.day) && {
                  backgroundColor: 'error.lighter',
                }),
              },
            }),
          }}
        />
      </LocalizationProvider>
      <Box display="flex" gap={2} flexDirection="column" mt={4} mb={2}>
        <Button onClick={handleApply} variant="contained" color="inherit">
          {intl.formatMessage({ id: 'activityLog.dateFilter.apply', defaultMessage: 'Filter' })}
        </Button>
        <Button onClick={handleClear} variant="outlined" color="inherit">
          {intl.formatMessage({
            id: 'activityLog.dateFilter.clear',
            defaultMessage: 'Clear Filter',
          })}
        </Button>
      </Box>
    </Box>
  )
}

export default DateFilterComponent
