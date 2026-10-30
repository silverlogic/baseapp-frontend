---
'@baseapp-frontend/authentication': major
'@baseapp-frontend/components': major
---

Upgrade zod from 3.25.7 to 4.6.7 and `@hookform/resolvers` from 5.0.1 to 5.9.2. zod 3 is affected
by CVE-2023-54404 (HIGH), which is only fixed in zod 4.6.6.

**Breaking:** the exported validation schemas are now zod 4 schemas, and the `validationSchema`
option of `useChangePassword`, `useResetPassword`, `useRecoverPassword`, `useRequestEmailChange` and
`useMfaActivateConfirm` expects a zod 4 schema. Consumers that build custom schemas or extend ours
(including a `zodResolver` passed through `formOptions`) must install zod 4. The `ZodType`-typed options are now typed
`z.ZodType<Form, Form>`, because zod 4 defaults a schema's input type to `unknown`. See the
[zod 4 migration guide](https://zod.dev/v4/changelog); the APIs this package uses (`min`, `max`,
`regex`, `email`, `nonempty`, `refine`, `{ message }`) work unchanged.
