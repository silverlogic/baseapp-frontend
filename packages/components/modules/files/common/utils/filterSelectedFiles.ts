import { IntlShape, createIntl } from 'react-intl'

import type { Accept } from '../types'
import { formatFileSize } from './formatters'

const DEFAULT_MAX_FILES = 10

export interface SelectableFile {
  name: string
  size: number
  type: string
}

export interface FileSelectionLimits {
  maxFiles?: number
  /** In bytes. No limit by default: the backend enforces its own and the error is toasted. */
  maxFileSize?: number
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
  { maxFiles = DEFAULT_MAX_FILES, maxFileSize, acceptedFileTypes }: FileSelectionLimits = {},
): FileSelectionResult<T> =>
  files.reduce<FileSelectionResult<T>>(
    (result, file) => {
      if (maxFileSize !== undefined && file.size > maxFileSize) {
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

type RejectedFiles = FileSelectionResult<SelectableFile>['rejected']

const isIntl = (value: unknown): value is IntlShape =>
  typeof (value as IntlShape)?.formatMessage === 'function'

/** One user-facing line for everything a selection dropped, or null if nothing was. */
export function describeRejectedFiles(
  intl: IntlShape,
  rejected: RejectedFiles,
  limits?: FileSelectionLimits,
): string | null
/** @deprecated Pass the `intl` object first so the message follows the active locale. */
export function describeRejectedFiles(
  rejected: RejectedFiles,
  limits?: FileSelectionLimits,
): string | null
export function describeRejectedFiles(
  ...args: [IntlShape, RejectedFiles, FileSelectionLimits?] | [RejectedFiles, FileSelectionLimits?]
): string | null {
  const [intl, rejected, { maxFiles = DEFAULT_MAX_FILES, maxFileSize } = {}] = isIntl(args[0])
    ? (args as [IntlShape, RejectedFiles, FileSelectionLimits?])
    : [createIntl({ locale: 'en' }), ...(args as [RejectedFiles, FileSelectionLimits?])]
  if (!rejected.length) return null
  const reasons = new Set(rejected.map(({ reason }) => reason))
  const details = [
    reasons.has('too-large') &&
      maxFileSize !== undefined &&
      intl.formatMessage(
        { id: 'files.selection.tooLarge', defaultMessage: 'over {maxFileSize}' },
        { maxFileSize: formatFileSize(maxFileSize) },
      ),
    reasons.has('invalid-type') &&
      intl.formatMessage({ id: 'files.selection.invalidType', defaultMessage: 'unsupported type' }),
    reasons.has('too-many') &&
      intl.formatMessage(
        { id: 'files.selection.tooMany', defaultMessage: 'more than {maxFiles} at once' },
        { maxFiles },
      ),
  ].filter(Boolean)
  return intl.formatMessage(
    {
      id: 'files.selection.rejected',
      defaultMessage:
        '{count, plural, one {# file was} other {# files were}} not added ({details}).',
    },
    { count: rejected.length, details: details.join(', ') },
  )
}
