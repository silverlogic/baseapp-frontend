import React, { FC } from 'react'

import { DateRangePicker, DateRangePickerProps } from '@mui/lab'
import { Chip } from '@mui/material'

import { DateRangeChipProps } from './types'

const DateRangeChip: FC<DateRangeChipProps> = ({ value, onChange }) => (
  <DateRangePicker
    startText="Start"
    endText="End"
    value={value}
    onChange={onChange}
    renderInput={(
      startProps: DateRangePickerProps['renderInput'],
      endProps: DateRangePickerProps['renderInput'],
    ) => <Chip label={`From: ${startProps.inputProps.value} To: ${endProps.inputProps.value}`} />}
  />
)

export default DateRangeChip
