import { CHAT_ROOM_OPTION_VALUES } from '../constants'
import { getVisibleOptions } from '../utils'

describe('getVisibleOptions', () => {
  it('returns Archive + Contact Details for a 1:1 room with no hiddenOptions', () => {
    expect(getVisibleOptions({ isGroup: false })).toEqual([
      CHAT_ROOM_OPTION_VALUES.archive,
      CHAT_ROOM_OPTION_VALUES.contactDetails,
    ])
  })

  it('returns Archive + Group Details + Leave Group for a group room with no hiddenOptions', () => {
    expect(getVisibleOptions({ isGroup: true })).toEqual([
      CHAT_ROOM_OPTION_VALUES.archive,
      CHAT_ROOM_OPTION_VALUES.groupDetails,
      CHAT_ROOM_OPTION_VALUES.leaveGroup,
    ])
  })

  it('returns Archive only on a 1:1 room when contactDetails is hidden', () => {
    expect(
      getVisibleOptions({
        isGroup: false,
        hiddenOptions: [CHAT_ROOM_OPTION_VALUES.contactDetails],
      }),
    ).toEqual([CHAT_ROOM_OPTION_VALUES.archive])
  })

  it('returns Archive + Group Details on a group room when leaveGroup is hidden', () => {
    expect(
      getVisibleOptions({
        isGroup: true,
        hiddenOptions: [CHAT_ROOM_OPTION_VALUES.leaveGroup],
      }),
    ).toEqual([CHAT_ROOM_OPTION_VALUES.archive, CHAT_ROOM_OPTION_VALUES.groupDetails])
  })

  it('returns Archive only on a group room when all non-archive items are hidden', () => {
    expect(
      getVisibleOptions({
        isGroup: true,
        hiddenOptions: [
          CHAT_ROOM_OPTION_VALUES.contactDetails,
          CHAT_ROOM_OPTION_VALUES.groupDetails,
          CHAT_ROOM_OPTION_VALUES.leaveGroup,
        ],
      }),
    ).toEqual([CHAT_ROOM_OPTION_VALUES.archive])
  })

  it('preserves order across repeated calls', () => {
    const first = getVisibleOptions({ isGroup: true })
    const second = getVisibleOptions({ isGroup: true })
    expect(second).toEqual(first)
  })

  it('defaults isGroup to false when omitted', () => {
    expect(getVisibleOptions({})).toEqual([
      CHAT_ROOM_OPTION_VALUES.archive,
      CHAT_ROOM_OPTION_VALUES.contactDetails,
    ])
  })
})
