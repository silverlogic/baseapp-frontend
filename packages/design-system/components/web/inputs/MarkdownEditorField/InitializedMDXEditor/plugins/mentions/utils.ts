import { MENTION_MARKDOWN_LINK_REGEX, MENTION_MARKDOWN_PROTOCOL } from './constants'
import type { MentionCommitted } from './types'

export const parseMentionsFromMarkdown = (markdown: string): MentionCommitted[] => {
  if (!markdown) return []
  const seen = new Set<string>()
  return Array.from(markdown.matchAll(MENTION_MARKDOWN_LINK_REGEX)).reduce<MentionCommitted[]>(
    (acc, match) => {
      const profileId = match[2]
      if (profileId && !seen.has(profileId)) {
        seen.add(profileId)
        acc.push({ profileId, urlPath: match[3] ?? '' })
      }
      return acc
    },
    [],
  )
}

// Replaces `[@name](mention://...)` markdown links with `@name` plain text. Used
// by the wrapper-level disable path: when `mentions.disabled === true`, incoming
// `value` and pasted text/plain are stripped before the editor sees them.
export const stripMentionLinksFromMarkdown = (markdown: string): string => {
  if (!markdown) return ''
  if (!markdown.includes(MENTION_MARKDOWN_PROTOCOL)) return markdown
  return markdown.replace(MENTION_MARKDOWN_LINK_REGEX, (_match, name: string) => `@${name}`)
}

/**
 * Popper accepts a "virtual anchor" — any object exposing `getBoundingClientRect`
 * — but its internals occasionally read other DOM properties. Use a real
 * detached element with an overridden bounding rect so the contract holds even
 * when Popper reaches for `ownerDocument`, `parentNode`, etc.
 */
export const makeVirtualAnchor = (rect: DOMRect | null): HTMLElement | null => {
  if (typeof document === 'undefined' || !rect) return null
  const el = document.createElement('div')
  el.getBoundingClientRect = () => rect
  return el
}

export const stripMentionProtocol = (url: string): string =>
  url.startsWith(MENTION_MARKDOWN_PROTOCOL) ? url.slice(MENTION_MARKDOWN_PROTOCOL.length) : url
