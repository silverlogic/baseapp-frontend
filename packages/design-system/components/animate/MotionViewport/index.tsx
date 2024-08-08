'use client'

import { FC } from 'react'

import Box from '@mui/material/Box'
import { m } from 'framer-motion'

import { useResponsive } from '../../../hooks/useResponsive'
import { varContainer } from '../variants'
import { MotionViewportProps } from './types'

const MotionViewport: FC<MotionViewportProps> = ({
  children,
  disableAnimatedMobile = true,
  ...other
}) => {
  const smDown = useResponsive('down', 'sm')

  if (smDown && disableAnimatedMobile) {
    return <Box {...other}>{children}</Box>
  }

  return (
    <Box
      component={m.div}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      variants={varContainer()}
      {...other}
    >
      {children}
    </Box>
  )
}

export default MotionViewport
