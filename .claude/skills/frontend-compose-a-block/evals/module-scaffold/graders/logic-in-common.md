---
type: llm
criteria: |
  The answer lays out a new module under `packages/components/modules/` whose
  pick/unpick logic is shared between web and native. It must:

  1. Put that shared logic in the `common/` leg — a business hook belongs at
     `common/hooks/<name>/`, and Relay documents with the hooks that wrap them
     under `common/graphql/`. A shared hook placed in `web/` or `native/`, or
     duplicated across both, is wrong: `native/` is structurally barred from
     importing `web/`.
  2. Keep the two UI legs thin — they render and import the shared hook from the
     module's `common` barrel rather than re-implementing the logic. The web
     component directory is `index.tsx` + `styled.tsx` + `types.ts`; the native
     one replaces `styled.tsx` with `styles.ts`.

  Correct but not required: modelling on `modules/comments` rather than
  `messages` or `activity-log`. Do not penalise an answer for omitting that.
focus: which leg the shared logic lands in, and how thin the two UI legs stay
target: last_message
---

The leg decision is the module route's load-bearing judgement and it is prose,
not a token a regex can catch — hence the judge. The deterministic `three-legs`
grader alongside it covers the mechanical half.
