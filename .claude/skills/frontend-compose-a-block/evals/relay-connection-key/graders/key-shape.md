---
type: regex
pattern: '@connection\(\s*key:\s*"\w+_\w+"'
match: contains
target: last_message
---

The key is `<FragmentName>_<fieldName>`, without exception —
`references/relay-pagination.md`, "The key: `<FragmentName>_<fieldName>`". The
fragment name is the disambiguator: two fragments paginating the same field
share one connection if either shortens its key to the field alone.

Twelve `@connection` directives exist at the pinned commit across four shapes,
only four of them conforming, so the wrong shape is the well-represented one in
the tree and the likelier output.

The pattern checks the two-segment shape rather than a literal key, since the
fragment name depends on what the model chooses to call the component.
