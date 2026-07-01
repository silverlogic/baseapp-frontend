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
 * Resolve the first user-facing error message from a Relay mutation's `onCompleted` callback,
 * checking the payload's field errors (`errors[].messages`) first, then Relay's top-level
 * transport errors. Falls back to `defaultMessage` when an error is present but carries no
 * message. Returns `undefined` when the mutation succeeded.
 */
export const getMutationErrorMessage = (
  payloadErrors: MutationPayloadErrors,
  transportErrors: MutationTransportErrors,
  { defaultMessage = 'Something went wrong.' } = {},
): string | undefined => {
  const payloadMessages = payloadErrors?.flatMap((error) => error?.messages ?? []) ?? []
  if (payloadMessages.length) {
    return payloadMessages[0] || defaultMessage
  }
  if (payloadErrors?.length) {
    return defaultMessage
  }
  if (transportErrors?.length) {
    return transportErrors[0]?.message || defaultMessage
  }
  return undefined
}
