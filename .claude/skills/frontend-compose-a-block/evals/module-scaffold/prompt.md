---
name: module-scaffold
runs: 3
tags: [module, scaffold]
---

# Add a feature module

In the `baseapp-frontend` submodule I want a new `reactions` feature module
under `packages/components/modules/`. It renders a reaction bar on both web and
React Native, and the pick/unpick logic — optimistic toggle, current-user
lookup, the action list — is identical on the two platforms.

Lay out the module's directory tree and say where that shared logic goes.
