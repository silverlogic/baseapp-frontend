---
"@baseapp-frontend/components": patch
---

Fix unsent message text carrying over to another conversation. `ChatRoom` kept the same `SendMessage` form mounted when the selected room changed, so a draft typed in one chat stayed in the input (with the send button active) after switching, and sending it posted to the wrong room. `SendMessage` is now keyed by `roomId`, so each conversation starts with an empty message box.
