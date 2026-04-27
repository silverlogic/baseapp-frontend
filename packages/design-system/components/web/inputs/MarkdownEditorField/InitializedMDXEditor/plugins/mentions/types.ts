import type { SerializedTextNode, Spread } from 'lexical'

export interface MentionProfileSuggestion {
  profileId: string
  name: string
  urlPath: string
  imageUrl?: string | null
}

export interface MentionCommitted {
  profileId: string
  urlPath: string
}

/**
 * Stateful controller produced by a consumer-side hook (e.g. `useProfileMentionSearch`).
 * The mentions plugin treats this as a black box — it does not own search state
 * or worry about debouncing, request IDs, or unmount-safety.
 */
export interface MentionsSearchController {
  items: MentionProfileSuggestion[]
  isLoading: boolean
  isLoadingMore: boolean
  hasNext: boolean
  /** Debounced internally by the controller's owner. */
  search: (query: string) => void
  loadMore: () => void
  reset: () => void
}

/**
 * Enabled-arm config — what the mentions plugin actually consumes. The
 * `MarkdownEditorField` wrapper narrows `MentionsConfig` to this shape before
 * forwarding to the editor; the plugin is never loaded with `{ disabled: true }`.
 */
export interface MentionsActiveConfig {
  disabled?: false
  controller: MentionsSearchController
  onMentionsChange?: (mentions: MentionCommitted[]) => void
  trigger?: string
  minChars?: number
}

/**
 * Public prop shape on `MarkdownEditorField`. Two arms:
 * - active: pass a controller (and optional callback / trigger / minChars).
 * - disabled: `{ disabled: true }` keeps the plugin out and triggers the wrapper-level
 *   sanitization path (`mention://` links stripped from initial value and from text/plain
 *   paste). `trigger` is still accepted on the disabled arm only as a placeholder for
 *   future symmetry — the plugin never sees this shape.
 */
export type MentionsConfig = MentionsActiveConfig | { disabled: true; trigger?: string }

export interface MentionMenuState {
  open: boolean
  query: string
  anchorRect: DOMRect | null
  activeIndex: number
  triggerStartOffset: number
}

export type SerializedMentionNode = Spread<
  {
    profileId: string
    urlPath: string
    name: string
  },
  SerializedTextNode
>
