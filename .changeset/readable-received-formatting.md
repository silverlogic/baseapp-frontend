---
"@baseapp-frontend/components": patch
---

Fix formatted text in received chat messages being unreadable. The shared `Markdown` inline-code highlight is a light surface, so on the dark bubble of a received message the light text sat on a light highlight; `MessageContent` now uses a translucent grey highlight for inline code in received messages. The chat rooms list preview also strips the inline HTML tags the markdown editor emits (e.g. underline as `<u>`), so it shows `HEllo` instead of `<u>HEllo</u>`.
