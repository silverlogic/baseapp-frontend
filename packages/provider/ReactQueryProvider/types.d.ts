import { PropsWithChildren } from 'react'

import { QueryClientConfig } from '@tanstack/react-query'

export interface IReactQueryProvider extends PropsWithChildren {
  config?: QueryClientConfig
}
