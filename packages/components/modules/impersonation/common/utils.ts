import { decodeJWT, isUserTokenValid } from '@baseapp-frontend/utils'
import type { JWTContent } from '@baseapp-frontend/utils'

/** Milliseconds left until `expiresAt` (an ISO date), never negative; `null` without a date. */
export const getRemainingTime = (expiresAt: string | null | undefined, now = Date.now()) => {
  if (!expiresAt) return null
  const expiry = new Date(expiresAt).getTime()
  if (Number.isNaN(expiry)) return null
  return Math.max(0, expiry - now)
}

const pad = (value: number) => String(value).padStart(2, '0')

/** `m:ss` below an hour, `h:mm:ss` from an hour up. */
export const formatRemainingTime = (remainingMs: number) => {
  const totalSeconds = Math.max(0, Math.ceil(remainingMs / 1000))
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  return hours > 0 ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${minutes}:${pad(seconds)}`
}

/**
 * Whether a session's refresh token can no longer be used. The backend caps it at the session's
 * expiry, so an unusable one means the session is over and there is nothing left to end.
 */
export const isSessionTokenUnusable = (refreshToken: string | null | undefined) =>
  !refreshToken || !isUserTokenValid(decodeJWT<JWTContent>(refreshToken))

/**
 * Loads `path` from scratch on web, so no state of the previous user survives. Does nothing on
 * native, where the caller's `onStarted` / `onEnded` takes over; there it warns in development,
 * since the app keeps showing the previous user.
 */
export const reloadAt = (path: string) => {
  if (typeof window === 'undefined' || typeof window.location?.assign !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(
        'impersonation: the tokens were swapped but nothing can be reloaded here; pass onStarted / onEnded to recreate the app state.',
      )
    }
    return
  }
  window.location.assign(path)
}
