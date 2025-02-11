'use client'

import { FC } from 'react'

import { menuItemClasses } from '@mui/material/MenuItem'
import MUIPopover, { PopoverOrigin } from '@mui/material/Popover'

import { StyledArrow } from './styled'
import { MenuPopoverProps } from './types'
import { getPosition } from './utils'

const Popover: FC<MenuPopoverProps> = ({
  open,
  children,
  arrow = 'top-right',
  hiddenArrow,
  sx,
  ...other
}) => {
  const { style, anchorOrigin, transformOrigin } = getPosition(arrow)

  return (
    <MUIPopover
      open={Boolean(open)}
      anchorEl={open}
      anchorOrigin={anchorOrigin as PopoverOrigin}
      transformOrigin={transformOrigin as PopoverOrigin}
      slotProps={{
        paper: {
          sx: {
            width: 'auto',
            overflow: 'inherit',
            ...style,
            [`& .${menuItemClasses.root}`]: {
              '& svg': {
                mr: 2,
                flexShrink: 0,
              },
            },
            ...sx,
          },
        },
      }}
      {...other}
    >
      {!hiddenArrow && <StyledArrow arrow={arrow} />}

      {children}
    </MUIPopover>
  )
}

export default Popover
