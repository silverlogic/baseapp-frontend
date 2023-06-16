import React, { FC, PropsWithChildren, ReactNode } from 'react'

import { ThemeProvider, theme } from '@baseapp-frontend/design-system-mui'
import { ReactQueryProvider } from '@baseapp-frontend/provider'

const ComponentWithProviders: FC<PropsWithChildren<ReactNode>> = ({ children }) => (
  <ReactQueryProvider>
    <ThemeProvider theme={theme} cacheKey="test-key">
      {children}
    </ThemeProvider>
  </ReactQueryProvider>
)

export default ComponentWithProviders
