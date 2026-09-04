---
type: llm
criteria: |
  The answer scaffolds a new submodule package and must do both of the
  following.

  1. Account for the always-required file set — `package.json`, `tsconfig.json`,
     `tsconfig.build.json`, `.eslintrc.js`, `.prettierrc.js`, `README.md`,
     `CHANGELOG.md`, an `exports` map with a `files` allowlist, an `index.ts`
     per source directory — plus the two that live outside the package
     directory: a `.changeset/<slug>.md` entry and a bullet in the root
     `README.md`. Naming the set and its two out-of-directory members counts;
     it does not have to reproduce every file's contents.
  2. Give the build command as `tsc --build tsconfig.build.json` (the canonical
     script being `rm -rf dist && tsc --build tsconfig.build.json`).

  Do not require anything else. Registering the package is just creating the
  directory — the `packages/*` glob picks it up — so an answer is not penalised
  for leaving `pnpm-workspace.yaml` and `turbo.json` untouched; editing either
  is in fact wrong.
focus: coverage of the required file set and the correct build command
target: last_message
---

Deliberately scored on coverage, not on file contents: the eleven-row table is
long, and an LLM judge is noisy over a full set of file bodies. Pairing it with
the deterministic `creates-manifest` and `no-tsup` graders keeps the case from
resting on the judge alone.
