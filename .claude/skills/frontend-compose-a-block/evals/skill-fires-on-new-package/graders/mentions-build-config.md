---
type: regex
pattern: "tsconfig\\.build\\.json"
match: contains
target: last_message
---

`tsconfig.build.json` is required file #3 in `references/package-scaffold.md`
and the file the build actually targets — the canonical script is
`rm -rf dist && tsc --build tsconfig.build.json`. An answer that scaffolds a
package without naming it has missed what decides the published surface.
