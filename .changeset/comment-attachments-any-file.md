---
'@baseapp-frontend/components': patch
---

Comment attachments accept any file type (videos included) and any size. The comment composer and
comment edit no longer restrict uploads to PNG/JPG/PDF up to 100MB, and `useFileSelect` /
`FileUploadDropzone` no longer default to a 100MB cap; pass `maxFileSize` / `acceptedFileTypes` to
restrict them. Limits are left to the backend (`MAX_FILE_UPLOAD_SIZE`): when it rejects an upload,
its reason is shown on the file and in an error toast instead of axios' generic "Request failed with
status code 400". `formatFileSize` now reports gigabytes.
