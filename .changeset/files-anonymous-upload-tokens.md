---
'@baseapp-frontend/components': patch
---

Support the backend's anonymous uploads and private files. The upload hooks keep the
`uploadToken` an anonymous upload gets at initiation and send it back on complete and abort
(`X-File-Upload-Token`) and on `fileAttachToTarget` (`uploadTokens`); logged-in uploads are
unchanged. `AttachedFileItem` disables Download when the file has no `url`, which private files
return for viewers without access.
