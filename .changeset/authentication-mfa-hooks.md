---
'@baseapp-frontend/authentication': minor
---

Add the MFA hooks that were missing for a full security settings screen: `useMfaChangePrimaryMethod` (invalidates the active methods query on success), `useMfaRegenerateBackupCodes` and `useMfaRequestCode`. Like the other `useMfa*` hooks they take react-query `options` and an `ApiClass` override. `MfaApi` gains `changePrimaryMethod({ method, code })`.

`MfaApi` now calls the endpoints where `baseapp_auth` serves them. `sendCode` used `GET /auth/code/request/`, which no backend route answers; it now sends `POST /auth/mfa/code/request/`, takes an optional `{ method }` (the primary method by default) and resolves to the backend's `{ details }`. `activate`, `confirmActivation`, `deactivate` and `regenerateBackupCodes` were missing the `mfa/` segment and now call `/auth/mfa/<method>/...`. A backend that only serves the MFA routes at the old `/auth/<method>/...` paths needs to pass its own `ApiClass` or mount them under `/auth/mfa/` too.

Types: `regenerateBackupCodes` resolves to `{ backupCodes: string[] }` (new `MfaBackupCodesResponse`) instead of `void` and its `code` is optional; `MfaConfirmationResponse` gains optional `access` and `refresh` tokens. New request types `MfaRequestCodeRequest`, `MfaRegenerateBackupCodesRequest` and `MfaChangePrimaryMethodRequest`, and `MfaRequestCodeResponse`.
