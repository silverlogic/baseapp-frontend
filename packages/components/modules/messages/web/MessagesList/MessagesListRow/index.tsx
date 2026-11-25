import { FC, useContext } from 'react'

import { MessagesListRowContext } from './context'
import type { MessagesListRowProps } from './types'

// Virtuoso applies new props (`data`, `itemContent`) in a layout effect, one render late. A
// message row whose record Relay just deleted (an optimistic message replaced by the server's)
// re-renders before that, still holding the deleted fragment ref. Reading the renderer from
// context instead updates every row in the same render as the list.
const MessagesListRow: FC<MessagesListRowProps> = ({ index }) => {
  const { renderMessagesGroup } = useContext(MessagesListRowContext)

  return <>{renderMessagesGroup(index)}</>
}

export default MessagesListRow
