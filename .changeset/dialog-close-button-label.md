---
"@baseapp-frontend/design-system": minor
---

`Dialog`'s close button now has an accessible name. The icon-only button rendered when `onClose`
is set gets a translated "Close dialog" `aria-label` by default (`designSystem.dialog.closeButtonLabel`,
en, es, pt); the new `closeButtonLabel` prop replaces it, and the new `CloseButtonProps` prop forwards extra
props to the button (its `onClick` runs before `onClose`). Neither prop reaches MUI's `Dialog` or
the DOM. `ConfirmDialog` passes both through to `Dialog`. Existing dialogs need no change.
