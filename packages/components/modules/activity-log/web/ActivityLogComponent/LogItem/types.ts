import { SxProps, Theme } from '@mui/system'

import { ActivityLogNode } from '../../../common'

export interface LogItemProps {
  log: ActivityLogNode
  sx?: SxProps<Theme>
}

export interface LogDiff {
  image?: string[]
  banner_image?: string[]
  biography?: string[]
  [key: string]: any
}

export interface LogEvent {
  node: {
    label: string
    diff?: LogDiff
  }
}

export interface LogNode {
  verb: string
  events: { edges: LogEvent[] }
}
