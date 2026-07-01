import { DEFAULT_ERROR_MESSAGE } from '../../../constants/errors'

// Structural equivalents of Relay's generated payload `errors { field messages }` selections
// and `relay-runtime`'s `PayloadError`, so callers can pass them straight through without
// this package depending on `relay-runtime`.
export type MutationPayloadErrors =
  | ReadonlyArray<
      | {
          readonly field?: string
          readonly messages?: ReadonlyArray<string> | null
        }
      | null
      | undefined
    >
  | null
  | undefined

export type MutationTransportErrors =
  | ReadonlyArray<{ readonly message?: string | null } | null | undefined>
  | null
  | undefined

/**
 * Resolve the first user-facing error message from a Relay mutation's `onCompleted` callback:
 * the first message in the payload's `errors[].messages`, else the first top-level transport
 * error message, else `defaultMessage` when an error is present but carries no message.
 * Returns `undefined` when the mutation succeeded.
 */
export const getMutationErrorMessage = (
  payloadErrors: MutationPayloadErrors,
  transportErrors: MutationTransportErrors,
  { defaultMessage = DEFAULT_ERROR_MESSAGE } = {},
): string | undefined => {
  if (!payloadErrors?.length && !transportErrors?.length) {
    return undefined
  }
  const firstPayloadMessage = payloadErrors?.flatMap((error) => error?.messages ?? [])[0]
  return firstPayloadMessage || transportErrors?.[0]?.message || defaultMessage
}
