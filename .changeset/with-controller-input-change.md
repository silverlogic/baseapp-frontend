---
'@baseapp-frontend/utils': patch
---

`withController` passes `onInputChange` only when the caller gives one, so a plain input no longer gets an unknown event handler that React warns about.
