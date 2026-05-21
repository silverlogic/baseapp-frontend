import { CHAT_TAB_VALUES } from '../constants'
import { DEFAULT_TAB_ORDER, getVisibleTabs } from '../utils'

describe('getVisibleTabs', () => {
  it('returns every tab in default order when hiddenTabs is undefined', () => {
    expect(getVisibleTabs({})).toEqual([
      CHAT_TAB_VALUES.active,
      CHAT_TAB_VALUES.unread,
      CHAT_TAB_VALUES.groups,
      CHAT_TAB_VALUES.archived,
    ])
  })

  it('returns every tab in default order when hiddenTabs is an empty array', () => {
    expect(getVisibleTabs({ hiddenTabs: [] })).toEqual(DEFAULT_TAB_ORDER)
  })

  it('hides the groups tab when hiddenTabs=["groups"]', () => {
    expect(getVisibleTabs({ hiddenTabs: [CHAT_TAB_VALUES.groups] })).toEqual([
      CHAT_TAB_VALUES.active,
      CHAT_TAB_VALUES.unread,
      CHAT_TAB_VALUES.archived,
    ])
  })

  it('hides multiple tabs when listed', () => {
    expect(
      getVisibleTabs({ hiddenTabs: [CHAT_TAB_VALUES.groups, CHAT_TAB_VALUES.archived] }),
    ).toEqual([CHAT_TAB_VALUES.active, CHAT_TAB_VALUES.unread])
  })

  it('returns the same ordered result across repeated calls (order stability)', () => {
    const first = getVisibleTabs({ hiddenTabs: [CHAT_TAB_VALUES.groups] })
    const second = getVisibleTabs({ hiddenTabs: [CHAT_TAB_VALUES.groups] })
    expect(second).toEqual(first)
  })

  it('treats undefined and empty array equivalently', () => {
    expect(getVisibleTabs({})).toEqual(getVisibleTabs({ hiddenTabs: [] }))
  })
})
