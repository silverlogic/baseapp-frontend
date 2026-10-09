import { FC, MouseEvent, useState } from 'react'

import { Checkbox, Chip, ListItemText, Menu, MenuItem } from '@mui/material'
import { useIntl } from 'react-intl'

import { EVENT_FILTER_OPTION_MESSAGES } from '../constants'
import { EventFilterOption } from '../types'
import { EventFilterChipProps } from './types'

const EventFilterChip: FC<EventFilterChipProps> = ({ options, selectedOptions, onChange }) => {
  const intl = useIntl()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleToggle = (option: EventFilterOption) => {
    const currentIndex = selectedOptions.indexOf(option)
    const newSelectedOptions = [...selectedOptions]

    if (currentIndex === -1) {
      newSelectedOptions.push(option)
    } else {
      newSelectedOptions.splice(currentIndex, 1)
    }

    onChange(newSelectedOptions)
  }

  return (
    <>
      <Chip
        label={intl.formatMessage({
          id: 'activityLog.eventFilter.label',
          defaultMessage: 'Filter',
        })}
        onClick={handleClick}
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handleToggle(option)}>
            <Checkbox checked={selectedOptions.indexOf(option) > -1} />
            <ListItemText primary={intl.formatMessage(EVENT_FILTER_OPTION_MESSAGES[option])} />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default EventFilterChip
