import { useCallback, useRef, useState } from 'react'

import { useNotification } from '@baseapp-frontend/utils'

import { useProtectedFileLinkMutation } from '../../graphql/mutations/ProtectedFileLink'
import { ProtectedFileDownloadError, getProtectedFileKey } from '../../utils/protectedFiles'
import type {
  ProtectedFileDownloadOptions,
  ProtectedFileDownloadTarget,
  ProtectedFileRef,
  UseProtectedFileDownloadLogicOptions,
  UseProtectedFileDownloadReturn,
} from './types'

const DEFAULT_ERROR_MESSAGE = 'Could not open the file. Please try again.'

type GraphQLErrorLike = { message?: string | null; extensions?: { code?: unknown } | null }

/** The first GraphQL error's message and code, from a transport error or `onCompleted` errors. */
const toDownloadError = (
  errors: ReadonlyArray<GraphQLErrorLike | null | undefined> | null | undefined,
  fallbackMessage = DEFAULT_ERROR_MESSAGE,
) => {
  const first = errors?.find((error) => error?.message)
  const code = first?.extensions?.code
  return new ProtectedFileDownloadError(
    first?.message || fallbackMessage,
    typeof code === 'string' ? code : undefined,
  )
}

const asDownloadError = (error: unknown) =>
  error instanceof ProtectedFileDownloadError
    ? error
    : new ProtectedFileDownloadError(
        error instanceof Error && error.message ? error.message : DEFAULT_ERROR_MESSAGE,
      )

/**
 * Platform-agnostic core of `useProtectedFileDownload`: mints a `protectedFileLink` and opens it
 * in the target `createTarget` returns. The target is created synchronously, inside the caller's
 * event handler, so a platform can reserve what needs a user gesture (a browser tab) before the
 * request goes out. Errors toast through `useNotification` unless `onError` is given.
 */
export const useProtectedFileDownloadLogic = ({
  createTarget,
  onError,
}: UseProtectedFileDownloadLogicOptions): UseProtectedFileDownloadReturn => {
  const [commitLink] = useProtectedFileLinkMutation()
  const { sendApiErrorToast } = useNotification()
  // Files being minted, latest last; a second click on one of them is ignored.
  const [pendingKeys, setPendingKeys] = useState<string[]>([])
  const inFlightRef = useRef<Set<string>>(new Set())

  const download = useCallback(
    (file: ProtectedFileRef, { disposition = 'attachment' }: ProtectedFileDownloadOptions = {}) => {
      const fileKey = getProtectedFileKey(file)
      if (inFlightRef.current.has(fileKey)) return Promise.resolve(false)
      inFlightRef.current.add(fileKey)
      setPendingKeys((keys) => [...keys, fileKey])

      const finish = () => {
        inFlightRef.current.delete(fileKey)
        setPendingKeys((keys) => keys.filter((key) => key !== fileKey))
      }
      const fail = (error: ProtectedFileDownloadError, target?: ProtectedFileDownloadTarget) => {
        target?.cancel?.()
        finish()
        if (onError) {
          onError(error)
        } else {
          sendApiErrorToast(error)
        }
        return false
      }

      let target: ProtectedFileDownloadTarget
      try {
        target = createTarget(disposition)
      } catch (error) {
        return Promise.resolve(fail(asDownloadError(error)))
      }

      return new Promise<string>((resolve, reject) => {
        commitLink({
          variables: { input: { key: file.key, objectId: file.objectId } },
          onCompleted: (response, errors) => {
            const payload = response?.protectedFileLink
            const payloadMessage = payload?.errors?.flatMap((error) => error?.messages ?? [])[0]
            if (errors?.length || payloadMessage || !payload?.url) {
              reject(toDownloadError(errors, payloadMessage ?? undefined))
              return
            }
            resolve(payload.url)
          },
          onError: (error) => {
            // The Relay network layer keeps the raw GraphQL errors on `graphQLErrors`.
            const { graphQLErrors } = error as Error & { graphQLErrors?: GraphQLErrorLike[] }
            reject(
              graphQLErrors?.length
                ? toDownloadError(graphQLErrors)
                : new ProtectedFileDownloadError(error.message || DEFAULT_ERROR_MESSAGE),
            )
          },
        })
      })
        .then(async (url) => {
          await target.open(url)
          finish()
          return true
        })
        .catch((error: unknown) => fail(asDownloadError(error), target))
    },
    [commitLink, createTarget, onError, sendApiErrorToast],
  )

  return {
    download,
    isPending: pendingKeys.length > 0,
    pendingKey: pendingKeys[pendingKeys.length - 1] ?? null,
  }
}
