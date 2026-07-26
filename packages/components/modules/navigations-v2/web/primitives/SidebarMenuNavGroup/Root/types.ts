import { ReactNode } from 'react'

import { StackProps } from '@mui/material'

export interface RootProps extends Omit<StackProps, 'children'> {
  children: (props: { open: boolean; handleToggle: () => void }) => ReactNode
  defaultOpen?: boolean
  hide?: boolean
}
