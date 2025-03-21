import { ObjectToken } from '../../../../styles/native'

export interface TabProps {
  onChange?: (value: string) => void
  currentValue?: string
  value: string
  label: string
  selectedColor?: keyof ObjectToken
  unselectedColor?: keyof ObjectToken
}
