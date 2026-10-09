import type { Accept } from '../types'
import { formatFileSize } from './formatters'

const DEFAULT_MAX_FILES = 10
const DEFAULT_MAX_FILE_SIZE = 100 * 1024 * 1024

export interface SelectableFile {
  name: string
  size: number
  type: string
}

export interface FileSelectionLimits {
  maxFiles?: number
  maxFileSize?: number // in bytes
  acceptedFileTypes?: Accept
}

export type FileRejectionReason = 'too-large' | 'invalid-type' | 'too-many'

export interface FileSelectionResult<T extends SelectableFile> {
  accepted: T[]
  rejected: { file: T; reason: FileRejectionReason }[]
}

const getExtension = (name: string) => {
  const dot = name.lastIndexOf('.')
  return dot > 0 ? name.slice(dot).toLowerCase() : ''
}

const matchesMime = (pattern: string, type: string) => {
  if (!type) return false
  if (pattern.endsWith('/*'))
    return type.toLowerCase().startsWith(pattern.slice(0, -1).toLowerCase())
  return type.toLowerCase() === pattern.toLowerCase()
}

/** Same semantics as the HTML `accept` attribute: any MIME pattern or extension matches. */
export const isAcceptedFileType = (file: SelectableFile, acceptedFileTypes?: Accept): boolean => {
  if (!acceptedFileTypes || !Object.keys(acceptedFileTypes).length) return true
  const extension = getExtension(file.name)
  return Object.entries(acceptedFileTypes).some(
    ([mime, extensions]) =>
      matchesMime(mime, file.type) ||
      (!!extension && extensions.some((ext) => ext.toLowerCase() === extension)),
  )
}

/**
 * Platform-agnostic selection rules shared by the web input and native pickers, so a
 * file the web composer refuses is refused on mobile too.
 */
export const filterSelectedFiles = <T extends SelectableFile>(
  files: T[],
  {
    maxFiles = DEFAULT_MAX_FILES,
    maxFileSize = DEFAULT_MAX_FILE_SIZE,
    acceptedFileTypes,
  }: FileSelectionLimits = {},
): FileSelectionResult<T> =>
  files.reduce<FileSelectionResult<T>>(
    (result, file) => {
      if (file.size > maxFileSize) {
        result.rejected.push({ file, reason: 'too-large' })
      } else if (!isAcceptedFileType(file, acceptedFileTypes)) {
        result.rejected.push({ file, reason: 'invalid-type' })
      } else if (result.accepted.length >= maxFiles) {
        result.rejected.push({ file, reason: 'too-many' })
      } else {
        result.accepted.push(file)
      }
      return result
    },
    { accepted: [], rejected: [] },
  )

/** One user-facing line for everything a selection dropped, or null if nothing was. */
export const describeRejectedFiles = (
  rejected: FileSelectionResult<SelectableFile>['rejected'],
  { maxFiles = DEFAULT_MAX_FILES, maxFileSize = DEFAULT_MAX_FILE_SIZE }: FileSelectionLimits = {},
): string | null => {
  if (!rejected.length) return null
  const reasons = new Set(rejected.map(({ reason }) => reason))
  const details = [
    reasons.has('too-large') && `over ${formatFileSize(maxFileSize)}`,
    reasons.has('invalid-type') && 'unsupported type',
    reasons.has('too-many') && `more than ${maxFiles} at once`,
  ].filter(Boolean)
  const subject = rejected.length === 1 ? '1 file was' : `${rejected.length} files were`
  return `${subject} not added (${details.join(', ')}).`
}
