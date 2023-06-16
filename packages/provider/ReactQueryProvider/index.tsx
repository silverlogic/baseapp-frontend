'use client'

import React, { FC, useState } from 'react'

import { QueryClientProvider } from '@tanstack/react-query'

import { IReactQueryProvider } from './types'
import { getQueryClient } from './utils'

const ReactQueryProvider: FC<IReactQueryProvider> = ({ children, config }) => {
  const [client] = useState(() => getQueryClient(config))

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export default ReactQueryProvider
