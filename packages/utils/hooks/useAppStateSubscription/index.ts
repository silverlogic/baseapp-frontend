import { useEffect, useRef } from 'react'

import { AppState, AppStateStatus } from 'react-native'

// Executes a callable when the app resumes.
// E.g. user blocks the app and unblock it later.
export const useAppStateSubscription = (onAppResume: () => void) => {
  const appState = useRef<AppStateStatus>(AppState.currentState)

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        onAppResume()
      }
      appState.current = nextAppState
    }

    const stateChangeSubscription = AppState.addEventListener('change', handleAppStateChange)
    return () => {
      stateChangeSubscription.remove()
    }
  }, [onAppResume])
}
