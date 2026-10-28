import { createContext } from 'react'

import type { MessagesListRowContextValue } from './types'

export const MessagesListRowContext = createContext<MessagesListRowContextValue>({
  renderMessagesGroup: () => null,
})
