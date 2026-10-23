---
'@baseapp-frontend/design-system': patch
---

`PhoneNumberField` no longer forwards `onInputChange` to the underlying input. `withController`
always passes an `onInputChange` key (an Autocomplete callback, `undefined` when none is given) to
the field it wraps, and spreading it onto the `TextField` leaked it to the DOM, so every controlled
`PhoneNumberField` made React log "Unknown event handler property `onInputChange`". The prop is now
accepted, typed and ignored; the controlled value and submit behaviour are unchanged.
