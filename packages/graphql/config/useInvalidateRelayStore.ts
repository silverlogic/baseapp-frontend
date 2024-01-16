import { commitLocalUpdate } from 'react-relay'
import type { Environment } from 'react-relay'
import { useRelayEnvironment } from 'react-relay/hooks'

function invalidateStore(environment: Environment) {
  commitLocalUpdate(environment, (store) => {
    store.invalidateStore()
  })
}

export default function useInvalidateRelayStore() {
  // This hook can be used to invalidate the entire Relay store.
  // This is useful when we want to clear the Relay store
  // after user logged out for instance.

  const environment = useRelayEnvironment()
  return () => invalidateStore(environment)
}
