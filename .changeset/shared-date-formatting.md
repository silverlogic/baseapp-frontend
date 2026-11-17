---
"@baseapp-frontend/components": patch
---

Format comment timestamps, chat dates, message day headers and notification ages through `react-intl` on native and web, so they follow the active locale. Native notifications also get their translated messages. The `messages.chatRoomItem.date.*`, `messages.messagesGroup.today` and `messages.shared.yesterday` ids are replaced by `shared.timestamp.*`.
