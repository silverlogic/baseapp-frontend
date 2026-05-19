import { CHAT_ROOM_OPTION_VALUES, DEFAULT_OPTION_ORDER } from './constants'
import type { ChatRoomOptionValue } from './constants'

export const getVisibleOptions = ({
  hiddenOptions = [],
  isGroup = false,
}: {
  hiddenOptions?: ChatRoomOptionValue[]
  isGroup?: boolean
}): ChatRoomOptionValue[] =>
  DEFAULT_OPTION_ORDER.filter(
    (value) =>
      !hiddenOptions.includes(value) &&
      !(isGroup && value === CHAT_ROOM_OPTION_VALUES.goToProfile),
  )
