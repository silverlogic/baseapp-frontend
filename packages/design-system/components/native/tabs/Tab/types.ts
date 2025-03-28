import { SystemTokens } from '../../../../styles/native'

export interface TabProps {
  value: string
  label: string
  selectedColor?: keyof SystemTokens['object']
  unselectedColor?: keyof SystemTokens['object']
}
