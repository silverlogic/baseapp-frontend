import type { MentionMenuState } from './types'

/**
 * The `@` sigil is also hard-coded in the regexes below, the Lexical node,
 * the markdown visitor, and persisted backend content. Don't change this
 * value — it won't propagate and will break the round-trip.
 */
export const MENTION_TRIGGER = '@'
export const MENTION_MIN_CHARS = 3
export const MENTION_PAGE_SIZE = 10
export const MENTION_MENU_WIDTH = 320
export const MENTION_MARKDOWN_PROTOCOL = 'mention://'
export const MENTION_NODE_CLASS = 'mdx-mention'

/** Detects `@query` after start-of-text or whitespace; group 1 is the partial query. */
export const MENTION_TRIGGER_WORD_REGEX = /(?:^|\s)@([A-Za-z0-9_-]*)$/

/** Matches the canonical persisted form: `[@name](mention://profile-id "urlPath")`. */
export const MENTION_MARKDOWN_LINK_REGEX =
  /\[@([^\]]+)\]\(mention:\/\/([^)\s"]+)(?:\s+"([^"]*)")?\)/g

/** Strips characters that would let a name break out of `[@…]`. */
export const MENTION_NAME_SANITIZE_REGEX = /[\]\\]/g
/** Strips characters that would let a urlPath break out of the `"…"` link title. */
export const MENTION_URL_PATH_SANITIZE_REGEX = /["\\]/g

export const INITIAL_MENU_STATE: MentionMenuState = {
  open: false,
  query: '',
  anchorRect: null,
  activeIndex: 0,
  triggerStartOffset: 0,
}
