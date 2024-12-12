import { ChangeEvent } from 'react'

export interface ActivityUserSearchBarProps {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}
