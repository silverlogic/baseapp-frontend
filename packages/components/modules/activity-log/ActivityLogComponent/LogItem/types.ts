import { SxProps, Theme } from '@mui/system'

import { ActivityLogNode } from '../../types'

export interface LogItemProps {
  log: ActivityLogNode
  sx?: SxProps<Theme>
}
