---
"@baseapp-frontend/utils": patch
---

`withController` now stores a MUI Select's value in the form. Select calls `onChange(event, child)` with the chosen `MenuItem` element as the second argument, which `withController` took for an Autocomplete-style selected value, so the form field held a React element instead of the option's value (for example the design-system `TextField` with `select`). A React element in that position is now ignored and react-hook-form reads the value from `event.target`, as for plain inputs. Autocomplete's `(event, value, reason)` is unchanged, and the consumer's `onChange` still receives every argument.
