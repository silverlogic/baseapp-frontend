---
'@baseapp-frontend/components': patch
---

`MessagesList` (web) renders each row through a context, so rows update in the same render as the list. Before, Virtuoso kept rendering a row with the previous props for one render, and a sent message's optimistic record, deleted when the server's arrived, raised Relay's "Expected to have been able to read non-null data for fragment `MessageItemFragment`" warning.
