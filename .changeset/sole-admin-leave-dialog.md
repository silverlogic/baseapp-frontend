---
'@baseapp-frontend/components': minor
---

Show the "Leave without choosing an admin?" dialog based on the server's `ChatRoom.isSoleAdmin` everywhere a group can be left, instead of counting admins among the participants loaded so far (only the first page of members). `useLeaveGroup` and both `LeaveGroupDialog`s accept `participantsCount`, so a sole admin who is also the last participant gets the regular leave copy. `ChatRoomToggleAdminMutation` and `UpdateChatRoomMutation` now refetch `isSoleAdmin`, keeping the flag current after promoting, demoting or removing members. `useCheckIsAdmin`'s `isSoleAdmin` is no longer used by these components and is slated for removal, since it only counts the members loaded so far; read `isSoleAdmin` from the room instead. Requires the backend's `ChatRoomToggleAdminPayload.room` field.
