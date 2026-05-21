// DOM-free pub/sub used to bridge imperative `setTokenAsync` / `removeTokenAsync`
// calls into the per-render Zustand store served by `<CookieProvider>`. On web the
// Provider also listens to `window` and `BroadcastChannel` for cross-tab sync;
// on React Native those APIs do not exist, so this emitter is the only path.
//
// Listener refs are held in a module-level Set. Each Provider's `useEffect`
// cleanup removes its listener, so no leak. No cookie data is cached here, so
// this does not reintroduce the SSR state-bleed issue that BA-3244 fixed.
import type { CookieChangeEventDetail } from './constants'

type Listener = (detail: CookieChangeEventDetail) => void

const listeners = new Set<Listener>()

export const subscribeToCookieChanges = (listener: Listener): (() => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export const emitCookieChange = (detail: CookieChangeEventDetail): void => {
  listeners.forEach((listener) => listener(detail))
}
