import { FC, useState } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { Box, Chip, Menu, Theme, useMediaQuery } from '@mui/material'
import dayjs from 'dayjs'

import MobileDrawer from '../../__shared__/MobileDrawer'
import DateFilterComponent from '../DateFilterComponent'
import { DateFilterChipProps } from './types'

const DateFilterChip: FC<DateFilterChipProps> = ({ fetchParameters, executeRefetch }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))

  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const { createdFrom, createdTo } = fetchParameters
  const hasDateSelected = createdFrom || createdTo

  const labelRender = () => {
    if (createdFrom && createdTo) {
      return `${dayjs(createdFrom).format('DD MMM YYYY')} - ${dayjs(createdTo).format('DD MMM YYYY')}`
    }
    if (createdFrom) {
      return `From ${dayjs(createdFrom).format('DD MMM YYYY')}`
    }
    if (createdTo) {
      return `Until ${dayjs(createdTo).format('DD MMM YYYY')}`
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
          createdFrom={fetchParameters.createdFrom ? dayjs(fetchParameters.createdFrom) : null}
          createdTo={fetchParameters.createdTo ? dayjs(fetchParameters.createdTo) : null}
          executeRefetch={executeRefetch}
          onApply={handleDrawerClose}
          onClearFilter={handleDrawerClose}
        />
      </MobileDrawer>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <Box padding={2}>
          <DateFilterComponent
            createdFrom={fetchParameters.createdFrom ? dayjs(fetchParameters.createdFrom) : null}
            createdTo={fetchParameters.createdTo ? dayjs(fetchParameters.createdTo) : null}
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
