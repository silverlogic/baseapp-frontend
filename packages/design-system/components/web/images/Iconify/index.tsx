'use client'

import { forwardRef } from 'react'

// @ts-ignore TODO: investigate import issue
import { Icon } from '@iconify/react'
import Box from '@mui/material/Box'

import { IconifyProps } from './types'

const Iconify = forwardRef<SVGElement, IconifyProps>(({ icon, width = 20, sx, ...other }, ref) => (
  <Box
    ref={ref}
    component={Icon}
    className="component-iconify"
    icon={icon}
    sx={{ width, height: width, ...sx }}
    {...other}
  />
))

export default Iconify
