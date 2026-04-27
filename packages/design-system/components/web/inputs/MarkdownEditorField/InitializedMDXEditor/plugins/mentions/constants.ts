import type { MentionMenuState } from './types'

export const MENTION_TRIGGER = '@'
export const MENTION_MIN_CHARS = 3
export const MENTION_PAGE_SIZE = 10
export const MENTION_MENU_WIDTH = 320
export const MENTION_MARKDOWN_PROTOCOL = 'mention://'
export const MENTION_NODE_CLASS = 'mdx-mention'

export const INITIAL_MENU_STATE: MentionMenuState = {
  open: false,
  query: '',
  anchorRect: null,
  activeIndex: 0,
  triggerStartOffset: 0,
}
