import React, { FC, useState } from 'react'

import { Box, Button } from '@mui/material'
import { DateValidationError, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { Dayjs } from 'dayjs'

import { DateFilterComponentProps } from './types'

const DateFilterComponent: FC<DateFilterComponentProps> = ({
  createdFrom,
  createdTo,
  executeRefetch,
  onApply,
  onClearFilter,

}) => {
  const [tempCreatedFrom, setTempCreatedFrom] = useState<Dayjs | null>(createdFrom)
  const [tempCreatedTo, setTempCreatedTo] = useState<Dayjs | null>(createdTo)
  const [error, setError] = React.useState<DateValidationError | null>(null)

  const errorMessage = React.useMemo(() => {
    switch (error) {
      case 'minDate': {
        return 'End date cannot be earlier than start date.'
      }
      case 'invalidDate': {
        return 'Your date is not valid'
      }

      default: {
        return ''
      }
    }
  }, [error])

  const handleApply = () => {
    if (tempCreatedTo && tempCreatedFrom && tempCreatedTo.isBefore(tempCreatedFrom)) {
      setError('minDate')
      return
    }

    setError(null)
    executeRefetch({
      createdFrom: tempCreatedFrom?.format('YYYY-MM-DD') || null,
      createdTo: tempCreatedTo?.format('YYYY-MM-DD') || null,
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

  return (
    <Box display="flex" gap={2} flexDirection="column">
      <Box display="flex" gap={2} flexDirection="column">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start date"
            value={tempCreatedFrom}
            onChange={(newValue) => setTempCreatedFrom(newValue)}
            disableFuture
          />
          <DatePicker
            label="End date"
            defaultValue={null}
            value={tempCreatedTo}
            onChange={(newValue) => setTempCreatedTo(newValue)}
            onError={(newError) => setError(newError)}
            disableFuture
            slotProps={{
              textField: {
                helperText: errorMessage,
              },
            }}
          />
        </LocalizationProvider>
      </Box>
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
