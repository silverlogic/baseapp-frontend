---
'@baseapp-frontend/test': patch
---

Type the `jest` → `vi` runtime alias in `vitest/globals.d.ts`. The shared helpers in `utils/` (`mocks.ts`, `mockFetch`, `mockFetchError`) call `jest.*`, so `tsc --noEmit` in a Vitest package that references this file (such as `@baseapp-frontend/authentication`) failed with "Cannot use namespace 'jest' as a value". `jest` is now declared as `typeof vi`, with `jest.Mock` and `jest.Mocked` mapped to Vitest's types. Types only; nothing changes at runtime.
