import { CHAT_ROOM_OPTION_VALUES, DEFAULT_OPTION_ORDER } from './constants'
import type { ChatRoomOptionValue } from './constants'

export const getVisibleOptions = ({
  hiddenOptions = [],
  isGroup = false,
}: {
  hiddenOptions?: ChatRoomOptionValue[]
  isGroup?: boolean
}): ChatRoomOptionValue[] =>
  DEFAULT_OPTION_ORDER.filter((value) => {
    if (hiddenOptions.includes(value)) return false
    if (isGroup && value === CHAT_ROOM_OPTION_VALUES.contactDetails) return false
    if (
      !isGroup &&
      (value === CHAT_ROOM_OPTION_VALUES.groupDetails ||
        value === CHAT_ROOM_OPTION_VALUES.leaveGroup)
    )
      return false
    return true
  })
