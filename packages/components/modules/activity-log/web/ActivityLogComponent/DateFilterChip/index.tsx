import { FC, useState } from 'react'

import { SwipeableDrawer } from '@baseapp-frontend/design-system/components/web/drawers'
import { DATE_FORMAT, formatDate } from '@baseapp-frontend/utils'

import { KeyboardArrowDown } from '@mui/icons-material'
import { Box, Chip, Divider, Menu, Theme, Typography, useMediaQuery } from '@mui/material'
import { DateTime } from 'luxon'
import { useIntl } from 'react-intl'

import DateFilterComponent from '../DateFilterComponent'
import { DateFilterChipProps } from './types'

const DateFilterChip: FC<DateFilterChipProps> = ({ fetchParameters, executeRefetch }) => {
  const intl = useIntl()
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

    if (createdFrom)
      return intl.formatMessage(
        { id: 'activityLog.dateFilter.from', defaultMessage: 'From {date}' },
        { date: fromDate },
      )
    if (createdTo)
      return intl.formatMessage(
        { id: 'activityLog.dateFilter.until', defaultMessage: 'Until {date}' },
        { date: toDate },
      )
    return intl.formatMessage({ id: 'activityLog.dateFilter.period', defaultMessage: 'Period' })
  }

  const handleOnClickOnChip = (event: React.MouseEvent<HTMLElement>) => {
    if (isMobile) {
      handleDrawerOpen()
    } else {
      setAnchorEl(event.currentTarget)
    }
  }

  const renderDateFilterComponent = (onClose: () => void) => (
    <>
      <Typography variant="subtitle1" m={4} align="center">
        {intl.formatMessage({ id: 'activityLog.dateFilter.period', defaultMessage: 'Period' })}
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <DateFilterComponent
        createdFrom={parseDate(createdFrom)}
        createdTo={parseDate(createdTo)}
        executeRefetch={executeRefetch}
        onApply={onClose}
        onClearFilter={onClose}
      />
    </>
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
      {isMobile ? (
        <SwipeableDrawer globalHeight="auto" open={drawerOpen} onClose={handleDrawerClose}>
          {renderDateFilterComponent(handleDrawerClose)}
        </SwipeableDrawer>
      ) : (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <Box padding={2}>{renderDateFilterComponent(handleMenuClose)}</Box>
        </Menu>
      )}
    </>
  )
}

export default DateFilterChip
