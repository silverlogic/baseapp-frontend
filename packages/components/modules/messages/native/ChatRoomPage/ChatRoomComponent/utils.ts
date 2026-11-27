/**
 * What tapping the chat header does: the consumer's `onHeaderPress` when given, the
 * default (open chat details) when omitted, and nothing when it is `null`.
 */
export const resolveHeaderPress = (
  onHeaderPress: (() => void) | null | undefined,
  fallback: () => void,
): (() => void) | undefined => {
  if (onHeaderPress === undefined) return fallback
  return onHeaderPress ?? undefined
}
