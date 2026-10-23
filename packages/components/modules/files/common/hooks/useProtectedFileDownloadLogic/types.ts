import type { ProtectedFile, ProtectedFileDisposition } from '../../types'
import type { ProtectedFileDownloadError } from '../../utils/protectedFiles'

/** The part of a `ProtectedFile` needed to mint a link. */
export type ProtectedFileRef = Pick<ProtectedFile, 'key' | 'objectId'>

export interface ProtectedFileDownloadOptions {
  /** Default `attachment`. */
  disposition?: ProtectedFileDisposition
}

/** Where a minted link is opened; created synchronously, before the link is minted. */
export interface ProtectedFileDownloadTarget {
  open: (url: string) => void | Promise<void>
  /** Releases what the target reserved (e.g. a blank tab) when minting fails. */
  cancel?: () => void
}

export type ProtectedFileDownloadTargetFactory = (
  disposition: ProtectedFileDisposition,
) => ProtectedFileDownloadTarget

export interface UseProtectedFileDownloadOptions {
  /** Replaces the default error toast. */
  onError?: (error: ProtectedFileDownloadError) => void
}

export interface UseProtectedFileDownloadLogicOptions extends UseProtectedFileDownloadOptions {
  /** Platform-specific: how a link is opened for a disposition. */
  createTarget: ProtectedFileDownloadTargetFactory
}

export interface UseProtectedFileDownloadReturn {
  /** Mints a link and opens it; resolves `true` once opened, `false` when it failed. */
  download: (file: ProtectedFileRef, options?: ProtectedFileDownloadOptions) => Promise<boolean>
  isPending: boolean
  /** `getProtectedFileKey(file)` of the file being minted, or null. */
  pendingKey: string | null
}
