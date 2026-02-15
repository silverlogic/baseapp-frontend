import { FC } from 'react'

import { Collapse } from '@mui/material'

import { ContentProps } from './types'

const Content: FC<ContentProps> = ({ open = true, children, ...props }) => (
  <Collapse in={open} {...props}>
    {children}
  </Collapse>
)

export default Content
