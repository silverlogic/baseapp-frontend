import type { ReactNode } from 'react'

export interface MessagesListRowContextValue {
  renderMessagesGroup: (index: number) => ReactNode
}

export interface MessagesListRowProps {
  index: number
}
