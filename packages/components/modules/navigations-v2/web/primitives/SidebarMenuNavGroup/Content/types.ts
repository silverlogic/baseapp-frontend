import { PropsWithChildren } from 'react'

import { CollapseProps } from '@mui/material'

export interface ContentProps extends PropsWithChildren<CollapseProps> {
  open?: boolean
}
