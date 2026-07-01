---
"@baseapp-frontend/components": patch
---

Replace the per-module one-off Relay error handling in mutation hooks (messages, profiles, notifications, comments) and in `InviteMemberDialog`/`BlockButtonWithDialog` with the shared `getMutationErrorMessage` from `@baseapp-frontend/utils`. Behavior notes: error toasts now show the first error message instead of one toast per message; hooks whose GraphQL documents select `errors { field messages }` but previously ignored them (chat delete/read/unread/archive, `profileUserRoleUpdate`) now surface those payload errors; `BlockButtonWithDialog` no longer closes the dialog and toasts success when the mutation returns transport errors.
