---
"@baseapp-frontend/utils": patch
---

`withController` passes `onInputChange` only when one is given. Plain text fields no longer
get an `onInputChange: undefined` prop, which reached the DOM and made React warn about an
unknown event handler property.
