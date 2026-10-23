---
'@baseapp-frontend/components': minor
---

New `MessageProfileButton` in `messages/web`: a "Message" button that opens (or reopens) a
one-to-one chat with a profile from anywhere in the app, as the current profile or an optional
`actorProfileId`, and calls `onRoomReady(roomId)` once the room exists.
