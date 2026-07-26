'use client'

import type { FC } from 'react'

import FileUploadTrigger from '../FileUploadTrigger'
import type { FileUploadProps } from './types'

/**
 * Backwards-compatible dropzone trigger. Thin wrapper over FileUploadTrigger so
 * existing `<FileUpload target={...} />` usages keep rendering the drop area.
 * New code can use FileUploadTrigger with `as="button"` for the compact trigger.
 */
const FileUpload: FC<FileUploadProps> = (props) => <FileUploadTrigger {...props} as="dropzone" />

export default FileUpload
export type { FileUploadProps } from './types'
