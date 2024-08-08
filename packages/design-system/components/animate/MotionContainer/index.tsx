'use client'

import { FC } from 'react'

import Box from '@mui/material/Box'
import { m } from 'framer-motion'

import { varContainer } from '../variants'
import { MotionContainerProps } from './types'

const MotionContainer: FC<MotionContainerProps> = ({
  animate,
  action = false,
  children,
  ...other
}) => {
  if (action) {
    return (
      <Box
        component={m.div}
        initial={false}
        animate={animate ? 'animate' : 'exit'}
        variants={varContainer()}
        {...other}
      >
        {children}
      </Box>
    )
  }

  return (
    <Box
      component={m.div}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={varContainer()}
      {...other}
    >
      {children}
    </Box>
  )
}

export default MotionContainer
