---
name: relay-connection-key
runs: 3
tags: [relay, pagination]
---

# Paginate a list and update it from a mutation

In the `baseapp-frontend` submodule, `modules/reactions` has a
`ReactionsList` component that needs `usePaginationFragment` over a
`reactions` field on `Query`, and a create mutation that has to prepend into
the same list.

Write the fragment's `@connection` directive and set up whatever the mutation
needs to address that connection.
