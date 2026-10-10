---
'@baseapp-frontend/components': patch
---

Files that finish uploading after a retry or resume are now attached to their target when
`autoAttach` is on (e.g. editing a comment on web). Before, only files that finished in the
original batch were attached: the retry/resume buttons run their own `useChunkedUpload`, so the
upload completed but was never attached and disappeared on reload. `useFileUploadLogic` now picks
completed uploads in its target's scope up from the upload store, and removes them from the store
once attached so they no longer show as a duplicate chip.
