---
"@baseapp-frontend/components": patch
---

Fix member selection leaking from a previously viewed group into the new group creation screen. `GroupDetailsPage` wrote the viewed group's members into the app-wide group-chat store and never cleared them, so the new group flow rendered those members pre-checked and disabled. The screen now clears the draft on unmount, and `resetGroupChat` also clears `roomId` (it was missing from the initial state, so Zustand's shallow merge left it behind).
