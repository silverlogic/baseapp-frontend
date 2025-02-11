// @ts-ignore TODO: investigate import issue
import type { IconifyIcon } from '@iconify/react'
import { BoxProps } from '@mui/material'

export interface IconifyProps extends BoxProps {
  icon: IconifyIcon | string
}
