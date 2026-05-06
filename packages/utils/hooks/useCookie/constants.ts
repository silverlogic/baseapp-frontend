export const MISSING_COOKIE_STORE_ERROR =
  'Cookie store has not been initialized. Make sure CookieProvider is used in the application.'

/**
 * Window event used to bridge imperative `setCookie`/`removeCookie` calls into the
 * per-render Zustand store served by `<CookieProvider>`. The Provider listens for this
 * event and forwards updates into the in-tree store so that `useCookie` consumers
 * re-render on cookie writes from outside the React tree (login mutation onSuccess,
 * fetch interceptors, etc.) — without any module-level mutable state.
 */
export const COOKIE_CHANGE_EVENT = 'baseapp:cookie-change'

export type CookieChangeEventDetail =
  | { type: 'set'; key: string; value: string }
  | { type: 'remove'; key: string }
