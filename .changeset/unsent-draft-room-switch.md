---
"@baseapp-frontend/components": patch
---

Fix unsent message text carrying over to another conversation. `ChatRoom` kept the same `SendMessage` form mounted when the selected room changed, so a draft typed in one chat stayed in the input (with the send button active) after switching, and sending it posted to the wrong room. Drafts are now saved per room: `ChatRoomProvider` stores each room's unsent message (`drafts`, `setDraft`, `clearDraft`), `SendMessage` restores it when that room is opened again and clears it once the message is sent, and `ChatRoom` keys `SendMessage` by `roomId` so a room you haven't typed in opens with an empty box.
