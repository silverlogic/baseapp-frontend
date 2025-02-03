import { FC, useState } from 'react'

import { DATE_FORMAT, formatDate } from '@baseapp-frontend/utils'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Box, Chip, Menu, Theme, useMediaQuery } from '@mui/material'
import { DateTime } from 'luxon'

import MobileDrawer from '../../__shared__/MobileDrawer'
import DateFilterComponent from '../DateFilterComponent'
import { DateFilterChipProps } from './types'

const DateFilterChip: FC<DateFilterChipProps> = ({ fetchParameters, executeRefetch }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))

  const handleDrawerOpen = () => setDrawerOpen(true)
  const handleDrawerClose = () => setDrawerOpen(false)
  const handleMenuClose = () => setAnchorEl(null)

  const { createdFrom, createdTo } = fetchParameters
  const hasDateSelected = createdFrom || createdTo

  const labelRender = () => {
    if (createdFrom && createdTo) {
      return `${formatDate(createdFrom, { toFormat: DATE_FORMAT[3] })} - ${formatDate(createdTo, { toFormat: DATE_FORMAT[3] })}`
    }
    if (createdFrom) {
      return `From ${formatDate(createdFrom, { toFormat: DATE_FORMAT[3] })}`
    }
    if (createdTo) {
      return `Until ${formatDate(createdTo, { toFormat: DATE_FORMAT[3] })}`
    }
    return 'Period'
  }

  const handleOnClickOnChip = (event: React.MouseEvent<HTMLElement>) => {
    if (isMobile) {
      handleDrawerOpen()
    } else {
      setAnchorEl(event.currentTarget)
    }
  }

  return (
    <>
      <Chip
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <span>{labelRender()}</span>
            <KeyboardArrowDownIcon color="action" />
          </Box>
        }
        onClick={handleOnClickOnChip}
        variant={hasDateSelected ? 'filled' : 'soft'}
        color="default"
      />

      <MobileDrawer open={drawerOpen} onClose={handleDrawerClose} title="Period">
        <DateFilterComponent
          createdFrom={createdFrom ? DateTime.fromFormat(createdFrom, DATE_FORMAT[0]) : null}
          createdTo={createdTo ? DateTime.fromFormat(createdTo, DATE_FORMAT[0]) : null}
          executeRefetch={executeRefetch}
          onApply={handleDrawerClose}
          onClearFilter={handleDrawerClose}
        />
      </MobileDrawer>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <Box padding={2}>
          <DateFilterComponent
            createdFrom={createdFrom ? DateTime.fromFormat(createdFrom, DATE_FORMAT[0]) : null}
            createdTo={createdTo ? DateTime.fromFormat(createdTo, DATE_FORMAT[0]) : null}
            executeRefetch={executeRefetch}
            onApply={handleMenuClose}
            onClearFilter={handleMenuClose}
          />
        </Box>
      </Menu>
    </>
  )
}

export default DateFilterChip
