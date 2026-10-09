import type { MixedStyleRecord } from '@native-html/render'

// Horizontal inset applied to the page content so it isn't flush against the screen edges.
export const CONTENT_HORIZONTAL_PADDING = 16

// URL schemes a page link is allowed to open externally. Anything else (e.g. `file:` or custom
// app schemes embedded in page content) is rejected so untrusted page body can't trigger them.
export const ALLOWED_LINK_SCHEMES = ['http:', 'https:', 'mailto:', 'tel:'] as const

// The render engine applies browser-default (em-based) block margins, which are far larger than
// the web markdown styling — there blocks render flush (margin: 0) and rely on line height. These
// tighter, collapsing margins restore a web-like vertical rhythm between headings and paragraphs.
export const HTML_TAGS_STYLES: MixedStyleRecord = {
  h1: { marginTop: 0, marginBottom: 12 },
  h2: { marginTop: 24, marginBottom: 8 },
  h3: { marginTop: 16, marginBottom: 8 },
  h4: { marginTop: 16, marginBottom: 8 },
  h5: { marginTop: 12, marginBottom: 4 },
  h6: { marginTop: 12, marginBottom: 4 },
  p: { marginTop: 0, marginBottom: 12 },
  ul: { marginTop: 0, marginBottom: 12 },
  ol: { marginTop: 0, marginBottom: 12 },
  blockquote: { marginTop: 0, marginBottom: 12 },
  pre: { marginTop: 0, marginBottom: 12 },
}
