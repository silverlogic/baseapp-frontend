import { Provider as JotaiProvider } from 'jotai'
import { Environment, RelayEnvironmentProvider } from 'react-relay'

import TestComponent from '../TestComponent'

const TestComponentWithProviders = ({ environment }: { environment: Environment }) => {
  return (
    <JotaiProvider>
      <RelayEnvironmentProvider environment={environment}>
        <TestComponent />
      </RelayEnvironmentProvider>
    </JotaiProvider>
  )
}

export default TestComponentWithProviders
