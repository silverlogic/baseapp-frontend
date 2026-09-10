---
type: llm
criteria: |
  The answer sets up a paginated connection and a mutation that writes into it.
  It must do both of:

  1. Extract the connection key to a `*_CONNECTION_KEY` constant in the module's
     `common/constants.ts`, rather than leaving the string retyped at each call
     site. A `graphql` template compiles as a literal, so the constant cannot be
     interpolated into the document itself — the answer may note that the
     constant mirrors the key declared in the fragment.
  2. Derive the connection id through a `get<X>ConnectionId` helper in the
     module's `common/utils.ts`, wrapping
     `ConnectionHandler.getConnectionID(parentOrTargetId, <THE_KEY>)`, so the
     mutation imports the helper instead of recomputing the id.

  Credit, not required: a unit test asserting the helper, and `filters:` on the
  directive when the field takes result-altering args (`filters: []` when the
  connection must survive an `orderBy` change).

  Inlining the key as a string literal at each `getConnectionID` call fails this
  grader — that is what `messages` and `profiles` do, and it is named as the
  counter-example.
focus: whether the key is extracted to a constant and the id derived through a util
target: last_message
---

The constant-plus-helper triple that `comments` models is the part a regex
cannot see, since both the constant and the helper names vary by module.
