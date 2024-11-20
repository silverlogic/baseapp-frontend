import { Environment, RelayEnvironmentProvider } from 'react-relay'

import CurrentProfileProvider from '../../..'
import TestComponent from '../TestComponent'

const TestComponentWithProviders = ({ environment }: { environment: Environment }) => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <CurrentProfileProvider>
        <TestComponent />
      </CurrentProfileProvider>
    </RelayEnvironmentProvider>
  )
}

export default TestComponentWithProviders
