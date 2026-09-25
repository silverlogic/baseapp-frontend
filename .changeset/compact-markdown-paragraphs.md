---
"@baseapp-frontend/design-system": patch
---

Fix multi-line comments (and any other `Markdown` content) rendering each line with a large blank gap. Pressing Enter in the rich-text editor starts a new paragraph, and react-markdown separates block elements with `"\n"` text nodes; because `white-space: pre-wrap` was set on the `Markdown` root, each of those newlines rendered as an extra blank line, on top of the `0.5em` margin between paragraphs. `pre-wrap` is now scoped to paragraphs, so soft line breaks (Shift+Enter) still wrap while the newlines between blocks collapse, and the margin between consecutive paragraphs is removed to match how the editor displays them.
