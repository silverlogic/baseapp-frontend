import { SxProps, Theme } from '@mui/system'

import { ActivityLogNode } from '../../../common'

export interface LogItemProps {
  log: ActivityLogNode
  sx?: SxProps<Theme>
}
