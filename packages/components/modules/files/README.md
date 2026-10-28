# Files Module

A comprehensive file upload, management, and display system with support for chunked uploads, file attachments, and cross-platform compatibility.

## Features

- 📤 **Chunked File Upload** - Efficient upload of large files with progress tracking
- 📎 **File Attachment** - Attach files to any target object (comments, posts, etc.)
- 🖼️ **Image Thumbnails** - Automatic 100x100 thumbnails for image files
- 🗑️ **File Deletion** - Delete attached files with proper permissions
- ⬇️ **File Download** - Platform-agnostic download handling
- 🔒 **Protected Downloads** - Permission-checked downloads of private model files through short-lived, user-bound links
- ⏸️ **Upload Control** - Pause, resume, and retry failed uploads
- 🎨 **Progress Tracking** - Real-time upload progress with visual feedback
- 📱 **Cross-Platform** - Shared logic for web and React Native

## Architecture

The module is organized into three main directories:

```
files/
├── common/          # Platform-agnostic business logic
├── web/            # Web UI components (React + MUI)
└── native/         # React Native UI components
```

### Common

Contains all platform-agnostic code that can be shared between web and mobile:

- **Hooks** - Business logic hooks for upload, delete, and download operations
- **Utils** - Formatting and utility functions
- **GraphQL** - Queries, mutations, and fragments
- **Context** - React context for file upload state management
- **Types** - Shared TypeScript types

### Web

Web-specific UI components built with React and Material-UI:

- `FileUpload` - Main file upload component with dropzone
- `FileUploadList` - Displays uploading and attached files
- `AttachedFileItem` - Individual attached file display
- `UploadingFileItem` - Individual uploading file with progress

### Native

React Native UI components over the same common hooks and upload pipeline.

- `useNativeFilePicker` - Photo library / document picker with the shared selection rules
- `createNativeUploadSource` - Wraps a picked file as an `UploadSource` (chunks read on demand)
- `UploadingFilesList` - In-progress uploads for one store scope
- `AttachedFilesList` - Files attached to a target; tapping one opens it
- `FileChip` - Compact tile both lists use

## Quick Start

### Basic File Upload

```typescript
import { FileUpload } from '@baseapp-frontend/components/modules/files/web'

function MyComponent({ target }) {
  return (
    <FileUpload
      target={target}
      maxFiles={5}
      maxFileSize={10 * 1024 * 1024} // 10MB
      acceptedFileTypes={['image/*', 'application/pdf']}
      onUploadComplete={(fileIds) => console.log('Uploaded:', fileIds)}
      onError={(error) => console.error(error)}
    />
  )
}
```

### Display File List

```typescript
import { FileUploadList } from '@baseapp-frontend/components/modules/files/web'

function MyComponent({ target }) {
  return (
    <FileUploadList
      target={target}
      showUploadProgress={true}
      allowRemove={true}
      allowRetry={true}
    />
  )
}
```

## Common Hooks

All hooks are available from the common module and can be used in both web and native platforms.

### useFileUploadLogic

Orchestrates file upload and attachment logic.

```typescript
import { useFileUploadLogic } from '@baseapp-frontend/components/modules/files/common'

const {
  handleFilesSelected,  // Function to handle file selection
  isAttaching,         // Boolean indicating if files are being attached
  resetKey,           // Key to reset UI components
} = useFileUploadLogic({
  targetObjectId: 'relay-id',
  autoAttach: true,
  onUploadComplete: (fileRelayIds) => {
    console.log('Upload complete:', fileRelayIds)
  },
  onAttachComplete: () => {
    console.log('Files attached successfully')
  },
  onError: (error) => {
    console.error('Upload error:', error)
  },
})

// Use in your component
<input
  type="file"
  onChange={(e) => handleFilesSelected(Array.from(e.target.files))}
/>
```

**Parameters:**
- `targetObjectId?: string` - The Relay ID of the target object to attach files to
- `autoAttach?: boolean` - Automatically attach files after upload (default: true)
- `onUploadComplete?: (fileRelayIds: string[], uploadTokens: string[]) => void` - Called after upload succeeds. `uploadTokens` holds the tokens of anonymous uploads among them; with `autoAttach: false`, pass them as `uploadTokens` to `fileAttachToTarget` when attaching
- `onAttachComplete?: () => void` - Called after files are attached
- `onError?: (error: Error) => void` - Called on errors

### useFileDeleteLogic

Handles file deletion with proper cache updates.

```typescript
import { useFileDeleteLogic } from '@baseapp-frontend/components/modules/files/common'

const {
  handleDelete,      // Function to delete a file
  isDeletingFile,   // Boolean indicating deletion in progress
} = useFileDeleteLogic({
  targetObjectId: 'relay-id',
  onDeleteComplete: () => {
    console.log('File deleted')
  },
  onError: (error) => {
    console.error('Delete error:', error)
  },
})

// Use in your component
<button onClick={() => handleDelete('file-relay-id')}>
  Delete
</button>
```

**Parameters:**
- `targetObjectId?: string` - The Relay ID of the target object owning the files
- `onDeleteComplete?: () => void` - Called after successful deletion
- `onError?: (error: Error) => void` - Called on errors

### useFileDownloadLogic

Platform-agnostic download logic with platform-specific handlers.

```typescript
import { useFileDownloadLogic } from '@baseapp-frontend/components/modules/files/common'

// Web implementation
const { handleDownload } = useFileDownloadLogic({
  downloadHandler: (url, fileName) => {
    window.open(url, '_blank')
  },
  onDownloadStart: () => console.log('Download started'),
  onDownloadComplete: () => console.log('Download complete'),
  onError: (error) => console.error(error),
})

// React Native implementation
import * as FileSystem from 'expo-file-system'

const { handleDownload } = useFileDownloadLogic({
  downloadHandler: async (url, fileName) => {
    const downloadPath = FileSystem.documentDirectory + fileName
    await FileSystem.downloadAsync(url, downloadPath)
  },
})

// Use in your component
<button onClick={() => handleDownload(fileUrl, fileName)}>
  Download
</button>
```

**Parameters:**
- `downloadHandler: (fileUrl: string, fileName?: string) => void | Promise<void>` - Platform-specific download implementation
- `onDownloadStart?: () => void` - Called when download starts
- `onDownloadComplete?: () => void` - Called when download completes
- `onError?: (error: Error) => void` - Called on errors

## Protected Downloads

The backend's protected downloads (`baseapp.files.downloads`) serve private model file fields —
an invoice PDF, a certificate, an import sheet — only after checking the viewer's permission on
every request. Such a field is exposed as a `ProtectedFile` (GraphQL `ProtectedFileField`, REST
`ProtectedFileSerializerField`), which is null when the file is empty or the viewer may not
download it. It carries no URL: the client mints a link with the `protectedFileLink` mutation
when the user clicks. The link is bound to the signed-in user and the profile they act as, lives
for a short time (`BASEAPP_FILES_DOWNLOAD_TICKET_MAX_AGE` on the backend), and re-checks access when opened, so the
browser can open it natively without an Authorization header.

### useProtectedFileDownload

```tsx
import { useFragment } from 'react-relay'

import {
  ProtectedFileFragment,
  getProtectedFileKey,
} from '@baseapp-frontend/components/files/common'
import { useProtectedFileDownload } from '@baseapp-frontend/components/files/web' // or files/native

const InvoicePdfButton = ({ invoice }) => {
  // invoice selects `pdf { ...ProtectedFile_file }`
  const pdf = useFragment(ProtectedFileFragment, invoice.pdf)
  const { download, pendingKey } = useProtectedFileDownload()

  return (
    <Button
      disabled={!pdf || pendingKey === getProtectedFileKey(pdf)}
      onClick={() => pdf && download(pdf)} // call it in the click handler itself
    >
      Download PDF
    </Button>
  )
}
```

`download(file, { disposition })` takes any `{ key, objectId }` — fragment data, or a
`ProtectedFile` from REST once its keys are camel-cased — and resolves `true` once the link is
opened, `false` when it failed.

- **`disposition: 'attachment'`** (default): web navigates the current tab to the link; the
  response's `Content-Disposition: attachment` saves the file and the page stays where it is. No Blob
  is built, so large files stream. See [What the client cannot see](#what-the-client-cannot-see) for
  when the page does not stay.
- **`disposition: 'inline'`**: web reserves a blank tab synchronously in the click handler (so pop-up
  blockers allow it), detaches it from the page (`opener = null`), then points it at the link. The
  file keeps the server's headers, including a sandboxing CSP for HTML. The tab is closed when the
  link cannot be minted; when the browser blocks the tab, the file opens in the current tab.
- **Native** opens the link in the system browser for both dispositions.

**Options:** `onError?: (error: ProtectedFileDownloadError) => void` replaces the default error toast
(`useNotification().sendApiErrorToast`). `error.code` is the backend's code when it sent one
(`not_authenticated`, `permission_denied`, `not_found`, or a project's own).

**Returns:** `{ download, isPending, pendingKey }`. `pendingKey` is `getProtectedFileKey(file)` of
the file being minted (the latest, when several are), so a list can show progress on one row. A second click on a file that is
still being minted is ignored.

The platform hooks are thin wrappers over `useProtectedFileDownloadLogic({ createTarget, onError })`
in `files/common`. `createTarget(disposition)` runs synchronously before the request and returns
`{ open(url), cancel?() }`; use it to open links some other way (an in-app browser, say).

#### What the client cannot see

The mutation checks access and mints the link; the browser then fetches the file itself, so the
hook never sees that response. Two consequences on web:

- **Pass the disposition the field is registered with.** `disposition` only picks how the browser
  opens the link; the backend never receives it. The response's `Content-Disposition` comes from the
  field's registration (`protected_files.register(..., disposition=...)`), and `ProtectedFile` does
  not expose it, so keep the two in step for each field. Calling `download(file)` (attachment) for a
  field registered `inline` replaces the app with the file; calling it with `'inline'` for an
  attachment field leaves a blank tab behind after the save. The backend also serves an `inline`
  field as an attachment when its type is not safe to display and no `csp` is registered.
- **Errors raised when the link is opened replace the page.** Access is checked when the link is
  minted, and those errors reach `onError` or the toast. A few can only happen when the link is
  opened: the link expired or the file was replaced in between, access was revoked in between, the
  backend's `protected_download` throttle answered 429, or reading the stored file (or the field's
  `ensure`) failed. For an attachment, the current tab then shows the backend's error response; for
  an inline file, the new tab does. The link is minted right before it is opened, so most of these
  are rare.

An app that would rather keep its page in every case can pass its own target to
`useProtectedFileDownloadLogic`, e.g. a hidden iframe for attachments. The trade-off is that an
error loaded in the iframe is never shown, since a cross-origin response cannot be read:

```tsx
import { useProtectedFileDownloadLogic } from '@baseapp-frontend/components/files/common'
import { createBrowserDownloadTarget } from '@baseapp-frontend/components/files/web'

const openInHiddenFrame = {
  open: (url: string) => {
    const frame = document.createElement('iframe')
    frame.hidden = true
    frame.src = url
    document.body.appendChild(frame)
    setTimeout(() => frame.remove(), 60_000)
  },
}

const useQuietDownload = () =>
  useProtectedFileDownloadLogic({
    createTarget: (disposition) =>
      disposition === 'inline' ? createBrowserDownloadTarget(disposition) : openInHiddenFrame,
  })
```

### Protected files without the hook

`useProtectedFileLinkMutation()` commits `protectedFileLink` without toasting, for callers that
need the link itself (e.g. to show `expiresAt`):

```graphql
mutation ProtectedFileLinkMutation($input: ProtectedFileLinkInput!) {
  protectedFileLink(input: $input) {
    url
    expiresAt
    file {
      ...ProtectedFile_file
    }
    errors {
      field
      messages
    }
  }
}
```

`objectId` also accepts the Relay id of the object holding the file.

## Utility Functions

### Formatters

```typescript
import {
  formatFileSize,
  formatDate,
  getFileType,
  calculateProgress,
  isImageFile,
} from '@baseapp-frontend/components/modules/files/common'

// Format file size
formatFileSize(1024)              // "1.00 KB"
formatFileSize(1048576)           // "1.00 MB"

// Format date
formatDate('2024-01-05T10:00:00Z') // "1/5/2024" (locale-specific)

// Get file type category
getFileType('image/png')           // "image"
getFileType('application/pdf')     // "pdf"
getFileType('video/mp4')           // "video"
getFileType('text/plain')          // "other"

// Calculate upload progress
calculateProgress(512, 1024)       // 50

// Check if file is an image
isImageFile('image/jpeg')          // true
isImageFile('application/pdf')     // false
```

## GraphQL Operations

### Mutations

#### FileAttachToTarget

Attach uploaded files to a target object:

```graphql
mutation FileAttachToTarget($input: FileAttachToTargetInput!, $connections: [ID!]!) {
  fileAttachToTarget(input: $input) {
    attachedFiles @prependEdge(connections: $connections) {
      node {
        ...FileItem_file
      }
    }
    target {
      filesCount
      isFilesEnabled
    }
  }
}
```

#### FileDelete

Delete a file:

```graphql
mutation FileDelete($input: FileDeleteInput!, $connections: [ID!]!) {
  fileDelete(input: $input) {
    deletedId @deleteEdge(connections: $connections)
    parent {
      filesCount
      isFilesEnabled
    }
  }
}
```

#### ProtectedFileLink

Mint a download link for a protected file; see [Protected Downloads](#protected-downloads).

### Queries

#### FilesList

Fragment to fetch files list:

```graphql
fragment FilesList_target on FilesInterface {
  id
  isFilesEnabled
  filesCount
  files(first: 20) @connection(key: "FilesList_files") {
    edges {
      node {
        id
        ...FileItem_file
      }
    }
  }
}
```

### Fragments

#### FileItem

File information fragment:

```graphql
fragment FileItem_file on File {
  id
  fileName
  fileSize
  fileContentType
  uploadStatus
  file
  thumbnail
  description
  created
  createdBy {
    id
    fullName
  }
  hasPerm(perm: "change_file")
}
```

#### ProtectedFile

```graphql
fragment ProtectedFile_file on ProtectedFile {
  key
  objectId
  fileName
  contentType
  size
}
```

## Component Props

### FileUpload

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| target | `FilesInterface$key` | required | Relay fragment reference for the target object |
| maxFiles | `number` | - | Maximum number of files allowed |
| maxFileSize | `number` | no limit | Maximum file size in bytes; when omitted the backend's `MAX_FILE_UPLOAD_SIZE` decides and its error is toasted |
| acceptedFileTypes | `string[]` | any type | Accepted MIME types (e.g., `['image/*', 'application/pdf']`) |
| disabled | `boolean` | false | Disable file upload |
| autoAttach | `boolean` | true | Automatically attach files after upload |
| onUploadComplete | `(fileRelayIds: string[], uploadTokens: string[]) => void` | - | Callback when upload completes; `uploadTokens` are needed to attach anonymous uploads yourself |
| onAttachComplete | `() => void` | - | Callback when files are attached |
| onError | `(error: Error) => void` | - | Error callback |

### FileUploadList

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| target | `FilesInterface$key` | required | Relay fragment reference for the target object |
| showUploadProgress | `boolean` | true | Show uploading files section |
| allowRemove | `boolean` | true | Allow removing files during upload |
| allowRetry | `boolean` | true | Allow retrying failed uploads |

### AttachedFileItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| file | `FileItem_file$key` | required | Relay fragment reference for the file |
| targetObjectId | `string` | - | Target object ID for deletion (enables delete button) |

## Platform Seam: `UploadSource`

The uploader only needs a file's `name`, `size`, `type` and a way to read bytes `[start, end)`:

```typescript
interface UploadSource {
  name: string
  size: number
  type: string
  readChunk: (start: number, end: number) => Promise<Blob | Uint8Array>
  dispose?: () => void
}
```

Every upload entry point (`uploadFile`, `addFile`, `handleFilesSelected`) accepts a web `File` or an
`UploadSource`. A `File` is wrapped automatically (`Blob.slice`); native builds one with
`createNativeUploadSource`, which reads each chunk through a short-lived expo-file-system
`FileHandle`. Chunks are read lazily inside the upload concurrency slot, so at most
`MAX_CONCURRENT_CHUNKS` chunks are in memory at once, and a retry reuses the bytes it already read.
`dispose` runs when the upload leaves the store (removed, attached, or its scope cleared), which is
how native deletes the cache copy it makes of an Android `content://` file.

```typescript
import { useDeferredFileAttachments } from '@baseapp-frontend/components/files/common'
import { UploadingFilesList, useNativeFilePicker } from '@baseapp-frontend/components/files/native'

const { handleFilesSelected, attachTo, scope } = useDeferredFileAttachments()
const { pickImages, pickDocuments } = useNativeFilePicker({
  onFilesSelected: handleFilesSelected,
  maxFiles: 5,
  maxFileSize: 100 * 1024 * 1024,
  acceptedFileTypes: { 'image/*': ['.png', '.jpg'], 'application/pdf': ['.pdf'] },
})
// ...render <UploadingFilesList scope={scope} />, then attachTo(newTargetId) once it exists.
```

Selection rules (`filterSelectedFiles`) are shared, so web and native accept and refuse the same files.

## Features in Detail

### Chunked Upload

Large files are automatically split into chunks for reliable upload:

- Configurable chunk size (default from backend)
- Parallel chunk upload
- Automatic retry on failure
- Progress tracking per chunk
- S3 multipart upload support

### Upload State Management

The file upload state is managed by a global zustand store — no provider wrapper is
needed. Call the hook from any component:

```typescript
import { useFileUpload } from '@baseapp-frontend/components/modules/files/common'

// Access upload state anywhere
const { files, removeFile, pauseFile, resumeFile } = useFileUpload()
```

Because the store is a module-level singleton, upload state is shared across every
mounted `FileUpload`/`FileUploadList`. When rendering multiple upload targets on the
same screen, in-progress items from all targets appear in each list's "Uploading"
section until they complete and attach.

### File Upload Status

Files go through several states during upload:

- `PENDING` - File queued for upload
- `UPLOADING` - Currently uploading
- `PAUSED` - Upload paused by user
- `COMPLETED` - Upload successful
- `FAILED` - Upload failed
- `ABORTED` - Upload cancelled

### Permissions

File operations respect backend permissions:

- Delete button only shows if user has `change_file` permission
- Permission checked via `hasPerm` field in FileItem fragment
- With private files on the backend, `url` is a signed, expiring link, or `null` when the viewer
  may not see the file; the Download button is then disabled
- Anonymous uploads (when the backend allows them) need no setup: the hooks keep the
  `uploadToken` returned at initiation and send it back on complete, abort and attach

## Best Practices

1. **Handle errors gracefully**
   ```typescript
   <FileUpload
     target={target}
     onError={(error) => {
       // Show user-friendly error message
       toast.error(error.message)
     }}
   />
   ```

2. **Set appropriate file limits**
   ```typescript
   <FileUpload
     target={target}
     maxFiles={5}
     maxFileSize={10 * 1024 * 1024} // 10MB
     acceptedFileTypes={['image/*', 'application/pdf']}
   />
   ```

3. **Provide targetObjectId for deletion**
   ```typescript
   <AttachedFileItem
     file={file}
     targetObjectId={target.id} // Required for delete functionality
   />
   ```

4. **Use platform-specific download handlers**
   ```typescript
   // Different implementations for web and native
   const downloadHandler = Platform.select({
     web: (url) => window.open(url, '_blank'),
     native: async (url, fileName) => {
       await FileSystem.downloadAsync(url, FileSystem.documentDirectory + fileName)
     },
   })
   ```

## Exports

All common functionality is exported from the main index:

```typescript
import {
  // Hooks
  useFileUploadLogic,
  useFileDeleteLogic,
  useFileDownloadLogic,
  useProtectedFileDownloadLogic,
  useChunkedUpload,
  useFileUpload,

  // Utilities
  formatFileSize,
  formatDate,
  getFileType,
  calculateProgress,
  isImageFile,
  getProtectedFileKey,
  ProtectedFileDownloadError,

  // Store
  useFileUploadStore,

  // GraphQL
  FileItemFragment,
  FilesListFragment,
  useFileAttachToTargetMutation,
  useFileDeleteMutation,
  ProtectedFileFragment,
  useProtectedFileLinkMutation,

  // Constants
  FileUploadStatus,

  // Types
  FileUploadProgress,
  UseFileUploadLogicParams,
  UseFileDeleteLogicParams,
  UseFileDownloadLogicParams,
  ProtectedFile,
  ProtectedFileDisposition,
  UseProtectedFileDownloadOptions,
  UseProtectedFileDownloadReturn,
} from '@baseapp-frontend/components/modules/files/common'
```

`useProtectedFileDownload` is exported from the `web` and `native` legs; `web` also exports
`createBrowserDownloadTarget`, the target its hook uses.

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import type {
  FileUploadProgress,
  UseFileUploadLogicParams,
  UseFileUploadLogicReturn,
  UseFileDeleteLogicParams,
  UseFileDeleteLogicReturn,
  UseFileDownloadLogicParams,
  UseFileDownloadLogicReturn,
} from '@baseapp-frontend/components/modules/files/common'
```

## Testing

### Unit Testing Hooks

```typescript
import { renderHook, act } from '@testing-library/react'
import { useFileUploadLogic } from '@baseapp-frontend/components/modules/files/common'

test('handles file upload', async () => {
  const { result } = renderHook(() =>
    useFileUploadLogic({
      targetObjectId: 'test-id',
      autoAttach: true,
    })
  )

  await act(async () => {
    await result.current.handleFilesSelected([mockFile])
  })

  expect(result.current.isAttaching).toBe(false)
})
```

### Testing Components

```typescript
import { render, screen } from '@testing-library/react'
import { FileUpload } from '@baseapp-frontend/components/modules/files/web'

test('renders file upload', () => {
  render(<FileUpload target={mockTarget} />)
  expect(screen.getByText(/drag and drop/i)).toBeInTheDocument()
})
```
