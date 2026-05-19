import type { ChatRoomOptionValue } from '../ChatRoomOptions/constants'

export interface ChatRoomPageComponentProps {
  roomId: string
  hiddenOptions?: ChatRoomOptionValue[]
}
