---
type: file_exists
path: "**/packages/scheduling/package.json"
target: files
---

Required file #1 in `references/package-scaffold.md`. The manifest is the
package's whole contract — `exports`, `files`, `catalog:` deps, scripts,
`sideEffects` — so a scaffold that writes anything at all must write this.

Glob rather than a fixed path: the sandbox working directory is not the
submodule tree, so where under it the package lands is not fixed.
