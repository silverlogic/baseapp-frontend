import { RelayEnvironmentProvider } from 'react-relay'
import { createMockEnvironment } from 'relay-test-utils'

interface RelayTestProviderProps {
  children: React.ReactNode
  environment: ReturnType<typeof createMockEnvironment>
}

export const RelayTestProvider = ({ children, environment }: RelayTestProviderProps) => (
  <RelayEnvironmentProvider environment={environment}>{children}</RelayEnvironmentProvider>
)
