---
"@baseapp-frontend/components": patch
---

Replace the per-module one-off Relay error handling in mutation hooks (messages, profiles, notifications, comments) and in `InviteMemberDialog`/`BlockButtonWithDialog` with the shared helpers from `@baseapp-frontend/utils` (`sendMutationErrorToast` / `getMutationErrorMessage`). Behavior notes:

- Error toasts show the first error message instead of one toast per message.
- Hooks whose GraphQL documents select `errors { field messages }` but previously ignored them now surface those payload errors: chat create (1:1 and group), chat delete/unread/archive message flows, `profileUserRoleUpdate`, and the leave-group flow. Hooks whose payload errors are already form-handled by their components (send/edit message, chat room update, organization create, comment create/update) stay transport-only to avoid double display.
- `ReadMessages` stays transport-only on purpose: it fires passively from `useEffect`s, so payload validation errors would surface as unattributable toasts during navigation.
- `useCreateChatRoomMutation` no longer activates the chat room (`setChatRoom`) on an error response, and `GroupChatCreate` drops its duplicate generic toast (the hook now toasts the specific message; field errors still map to the form).
- `RemoveMember` no longer shows "Member removed successfully" when the mutation completes with top-level GraphQL errors.
- `BlockButtonWithDialog` no longer closes the dialog and toasts success when the mutation returns transport errors.
