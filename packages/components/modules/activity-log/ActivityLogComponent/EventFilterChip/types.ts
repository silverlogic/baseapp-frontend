import { EventFilterOption } from '../types'

export interface EventFilterChipProps {
  options: EventFilterOption[]
  selectedOptions: EventFilterOption[]
  onChange: (selected: EventFilterOption[]) => void
}
