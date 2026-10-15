---
'@baseapp-frontend/components': patch
---

Support the backend's anonymous uploads and private files. The upload hooks keep the
`uploadToken` an anonymous upload gets at initiation and send it back on complete and abort
(`X-File-Upload-Token`) and on `fileAttachToTarget` (`uploadTokens`); logged-in uploads are
unchanged. `AttachedFileItem` disables Download when the file has no `url`, which private files
return for viewers without access.
With `autoAttach: false`, `onUploadComplete` also receives the upload tokens of the files
(`(fileRelayIds, uploadTokens)`), since the files leave the upload store before the caller attaches them.
