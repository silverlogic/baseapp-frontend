---
type: regex
pattern: "tsup"
match: not_contains
target: last_message
---

`packages/components/tsup.config.ts` and `packages/design-system/tsup.config.ts`
both exist and both packages still list `tsup` in devDependencies, but nothing
invokes either file. SKILL.md names this "the dead `tsup` pair" and
`references/package-scaffold.md` lists building with tsup as an anti-pattern:
the build is `tsc --build tsconfig.build.json`, with no bundler step.

Reaching for tsup is the specific mistake a model makes by pattern-matching
against the two packages that carry the stale config, so its absence is the
signal.
