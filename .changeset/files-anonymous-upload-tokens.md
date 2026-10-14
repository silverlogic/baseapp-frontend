---
'@baseapp-frontend/components': patch
'@baseapp-frontend/graphql': patch
---

Support the backend's anonymous uploads and private files. The upload hooks keep the
`uploadToken` an anonymous upload gets at initiation and send it back on complete and abort
(`X-File-Upload-Token`) and on `fileAttachToTarget` (`uploadTokens`); logged-in uploads are
unchanged. The tokens are also remembered for the browser session (the 20 most recent) and sent
as `X-File-Upload-Token` on every GraphQL request, so an anonymous uploader can read its file's
`url` and `thumbnail` again later. `AttachedFileItem` disables Download when the file has no
`url`, which private files return for viewers without access.

`@baseapp-frontend/graphql` adds `registerGraphQLRequestHeaders(provider)`, which adds headers to
every GraphQL HTTP request, and `getGraphQLRequestHeaders()`.
