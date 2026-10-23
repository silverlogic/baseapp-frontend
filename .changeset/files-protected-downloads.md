---
'@baseapp-frontend/components': minor
---

Add protected downloads to the files module, the client side of the backend's
`baseapp.files.downloads`. New in `files/common`: the `ProtectedFile` type, the
`ProtectedFile_file` fragment (`ProtectedFileFragment`), the `protectedFileLink` mutation
(`useProtectedFileLinkMutation`), `useProtectedFileDownloadLogic`, `getProtectedFileKey` and
`ProtectedFileDownloadError`. New in `files/web` and `files/native`: `useProtectedFileDownload()`,
returning `{ download(file, { disposition }), isPending, pendingKey }`. It mints a short-lived,
user-bound link and opens it natively: an attachment is a plain navigation (no Blob, no
Authorization header), an inline file opens in a tab reserved in the click handler with
`opener = null` and closed if minting fails; native opens the system browser. Purely additive.
