import { createVitestConfig } from '@baseapp-frontend/test/vitest/config.mjs'

// design-system is a UI package — its real coverage is the component (Cypress) layer,
// not unit. Whole-surface v8 (`all: true`) both errors on some source files and reports
// a meaningless ~6%, so this package is NOT subject to the unit no-regress gate
// (see docs/coverage-baseline.md). The factory default (v8, text-summary, no `all`) is
// exactly the informational touched-files coverage we want, so no coverage override.
export default createVitestConfig()
