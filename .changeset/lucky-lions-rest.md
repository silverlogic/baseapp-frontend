---
"@baseapp-frontend/components": patch
"@baseapp-frontend/design-system": patch
---

Fix the native chat rooms list not resting at the bottom, leaving its last card untappable with 20+ rooms. `InfiniteScrollerView` sized its container with `height: '100%'`, which resolves against the whole parent rather than the space left over — and on the Messages screen the list is the last child of a flex column that also holds the title, search input and tabs, so its scroll viewport ran past the bottom of the screen. iOS caps scrolling at `contentHeight - viewportHeight`, making that overhang unreachable: the list snapped back short of the end and the final cards sat below the device edge. The container now uses `flex: 1` so it takes only the remaining space, which also fixes the same overflow in the add-contact-to-group list (previously papered over with a 40px content padding); `CreateRoomList` and `NotificationsList` pin the height in their own wrappers and are unaffected. The list's own footer spacer supplies the gap below the last card.
