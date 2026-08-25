---
"@baseapp-frontend/components": patch
---

Fix group member selection going out of sync with the actual group. `GroupDetailsPage` wrote the viewed group's members into the app-wide group-chat store and never cleared them, so the new group flow rendered those members pre-checked and disabled; it now clears the draft on unmount. It also only wrote that context on mount, while the add-members and edit-group screens reset the store when they finish and leave it mounted underneath — so after adding a member once, reopening "Add members" lost the room id ("Room ID is missing") and showed existing members as unselected. The context is now re-established on focus, `UpdateChatRoomMutation` returns `participantIds` so newly added members are reflected right away, and `resetGroupChat` clears `roomId` (it was missing from the initial state, so Zustand's shallow merge left it behind).
