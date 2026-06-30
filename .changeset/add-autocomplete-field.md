---
"@baseapp-frontend/design-system": minor
"@baseapp-frontend/utils": minor
---

Add `AutocompleteField`, a design-system autocomplete/combobox input.

- **design-system**: new `AutocompleteField` — a `withController`-wrapped MUI `Autocomplete` following the shared `*Field` conventions (RHF integration, debounced text input, an `isPending` spinner) with a default `renderInput`. The member-invite search now builds on it instead of a bespoke combobox.
- **utils**: `withController` now supports Autocomplete-style fields — it debounces `onInputChange`, forwards the selected value (not the raw event) to the form field, and reads the latest `onChange`/`onInputChange` from refs so debounced callbacks never go stale. Existing single-argument inputs are unaffected.
