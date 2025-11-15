import React, { FC, useState } from 'react'

import { Box, Button } from '@mui/material'
import { DateValidationError, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { formatISO } from 'date-fns'

import { DateFilterComponentProps } from './types'

const DateFilterComponent: FC<DateFilterComponentProps> = ({
  createdFrom,
  createdTo,
  executeRefetch,
  onApply,
  onClearFilter,
}) => {
  const [tempCreatedFrom, setTempCreatedFrom] = useState<Date | null>(createdFrom ?? null)
  const [tempCreatedTo, setTempCreatedTo] = useState<Date | null>(createdTo ?? null)

  const [error, setError] = useState<DateValidationError | null>(null)

  const errorMessage = React.useMemo(() => {
    switch (error) {
      case 'minDate':
        return 'End date cannot be earlier than start date.'
      case 'invalidDate':
        return 'Your date is not valid'
      default:
        return ''
    }
  }, [error])

  const handleApply = () => {
    if (tempCreatedTo && tempCreatedFrom && tempCreatedTo < tempCreatedFrom) {
      setError('minDate')
      return
    }

    setError(null)
    executeRefetch({
      createdFrom: tempCreatedFrom ? formatISO(tempCreatedFrom, { representation: 'date' }) : null,
      createdTo: tempCreatedTo ? formatISO(tempCreatedTo, { representation: 'date' }) : null,
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

  const disableStartDate = (date: Date) => (tempCreatedTo ? date > tempCreatedTo : false)

  const disableEndDate = (date: Date) => (tempCreatedFrom ? date < tempCreatedFrom : false)

  return (
    <Box display="flex" gap={2} flexDirection="column">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Start date"
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
          label="End date"
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
          Filter
        </Button>
        <Button onClick={handleClear} variant="outlined" color="inherit">
          Clear Filter
        </Button>
      </Box>
    </Box>
  )
}

export default DateFilterComponent
