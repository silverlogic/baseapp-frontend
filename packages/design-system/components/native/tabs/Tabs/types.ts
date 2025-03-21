import { ViewProps } from '../../views'
import { TabProps } from '../Tab/types'

export interface TabsProps extends ViewProps {
  onChange: (value: string) => void
  value: string
  children: React.ReactElement<TabProps>[]
}
