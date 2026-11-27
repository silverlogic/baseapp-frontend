import type { ChatRoomOptionValue } from '../ChatRoomOptions/constants'

export interface ChatRoomPageComponentProps {
  roomId: string
  hiddenOptions?: ChatRoomOptionValue[]
  /**
   * What tapping the header's avatar and title does. Omitted: opens the chat details page
   * (the default). A function: called instead. `null`: the header is not tappable.
   */
  onHeaderPress?: (() => void) | null
}
