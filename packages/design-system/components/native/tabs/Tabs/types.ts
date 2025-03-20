import { ReactElement } from 'react'

import { ViewProps } from '../../views'
import { TabProps } from '../Tab/types'

export interface TabsProps extends ViewProps {
  onChange: (value: string) => void
  value: string
  children: ReactElement<TabProps>[]
}

export type TabsContextValue = {
  currentValue: string
  onChange: (value: string) => void
}
