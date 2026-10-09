---
'@baseapp-frontend/components': major
'@baseapp-frontend/design-system': minor
---

Comments on mobile can carry file attachments, like on web: attach photos from the library or PDFs
from the document picker, watch them upload above the composer, and see (and open) a comment's
files under it.

**Breaking:** `FileUploadProgress.file` is now typed `UploadSource` instead of `File`, because a
native upload has no `File`. A web `File` passed in is wrapped automatically and its `name`, `size`
and `type` read the same; code that read `File`-only members off `fileProgress.file` (`slice`,
`lastModified`, passing it to `URL.createObjectURL`) has to keep its own reference to the original
file instead.

The upload pipeline is now shared across platforms instead of being web-only:

- **`UploadSource`**: every upload entry point (`uploadFile`, `addFile`, `handleFilesSelected`)
  accepts a web `File` or an `UploadSource` (`name`, `size`, `type`, `readChunk(start, end)`,
  optional `dispose()`). Chunks are read lazily inside the concurrency slot, so a native upload holds
  at most `MAX_CONCURRENT_CHUNKS` chunks in memory, and a retried chunk reuses the bytes it already
  read. `dispose` runs when an upload leaves the store.
- A chunk whose upload was paused or removed during a retry backoff no longer starts a new request,
  and `clearScope` now aborts the uploads it removes.
- **`filterSelectedFiles`** / **`describeRejectedFiles`**: the size/count/type rules both pickers
  apply. The web file input now also drops files whose type is outside `acceptedFileTypes` (the
  `accept` attribute alone can be bypassed from the OS picker).
- **`COMMENT_FILE_ATTACHMENT_LIMITS`** (`comments/common`): the comment attachment limits, shared by
  web and mobile.
- **`files/native`**: `useNativeFilePicker`, `createNativeUploadSource`, `UploadingFilesList`,
  `AttachedFilesList`, `FileChip`.
- Native `SocialInput` takes `SocialUpsertActionsProps`, and `SocialInputDrawer` takes a `Footer`
  that the sheet grows to fit (`Placeholder` gets the matching `footerHeight`).
- `@baseapp-frontend/design-system`: native `AttachmentIcon`.
