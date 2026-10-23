import type { ProtectedFile } from '../types'

/** Identifies one protected file, as `useProtectedFileDownload` reports it in `pendingKey`. */
export const getProtectedFileKey = ({ key, objectId }: Pick<ProtectedFile, 'key' | 'objectId'>) =>
  `${key}:${objectId}`

/**
 * Why a protected file could not be opened. `code` is the backend's error code when it sent one
 * (`not_authenticated`, `permission_denied`, `not_found`, or a project-specific code).
 */
export class ProtectedFileDownloadError extends Error {
  code?: string

  constructor(message: string, code?: string) {
    super(message)
    this.name = 'ProtectedFileDownloadError'
    this.code = code
  }
}
