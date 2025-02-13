import { FC, useState } from 'react'

import { DATE_FORMAT, formatDate } from '@baseapp-frontend/utils'

import { KeyboardArrowDown } from '@mui/icons-material'
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

  const parseDate = (date: string | null): DateTime | null =>
    date ? DateTime.fromFormat(date, DATE_FORMAT.api) : null

  const formatLabelDate = (date: string | null): string | null =>
    date ? formatDate(date, { toFormat: DATE_FORMAT[3] }) : null

  const labelRender = () => {
    const fromDate = formatLabelDate(createdFrom)
    const toDate = formatLabelDate(createdTo)
    if (createdFrom && createdTo) return `${fromDate} - ${toDate}`

    if (createdFrom) return `From ${fromDate}`
    if (createdTo) return `Until ${toDate}`
    return 'Period'
  }

  const handleOnClickOnChip = (event: React.MouseEvent<HTMLElement>) => {
    if (isMobile) {
      handleDrawerOpen()
    } else {
      setAnchorEl(event.currentTarget)
    }
  }

  const renderDateFilterComponent = (onClose: () => void) => (
    <DateFilterComponent
      createdFrom={parseDate(createdFrom)}
      createdTo={parseDate(createdTo)}
      executeRefetch={executeRefetch}
      onApply={onClose}
      onClearFilter={onClose}
    />
  )

  return (
    <>
      <Chip
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <span>{labelRender()}</span>
            <KeyboardArrowDown color="action" />
          </Box>
        }
        onClick={handleOnClickOnChip}
        variant={hasDateSelected ? 'filled' : 'soft'}
        color="default"
      />
      <MobileDrawer open={drawerOpen} onClose={handleDrawerClose} title="Period">
        {renderDateFilterComponent(handleDrawerClose)}
      </MobileDrawer>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <Box padding={2}>{renderDateFilterComponent(handleMenuClose)}</Box>
      </Menu>
    </>
  )
}

export default DateFilterChip
