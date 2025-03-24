import { RelayTestProviderProps } from '../RelayTestProvider/types'

export interface WithGraphqlTestProvidersProps extends RelayTestProviderProps {
  context?: {
    parameters: {
      queryName?: string
      mockResolvers?: any
      mockData?: any
    }
  }
}
