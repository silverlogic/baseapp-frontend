---
"@baseapp-frontend/components": patch
"@baseapp-frontend/design-system": patch
"@baseapp-frontend/i18n": patch
---

Translate the strings the new `intl-no-hardcoded-text` / `intl-no-text-constants` ast-grep rules
found: the native AppBar close label and hint, the group chat image upload toasts, the native group
member count and the leave-group dialog copy returned by `useLeaveGroup`. `LEAVE_GROUP_DIALOG_TEXT_COPY`
is deprecated in favour of `LEAVE_GROUP_DIALOG_COPY_MESSAGES`; the unused native `CHAT_TAB_LABEL` is removed.
